package com.myproject.backcreateams.controllers;

import java.util.Map;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerMethod;

import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;

import com.myproject.backcreateams.DTO.UserCreateDTO;
import com.myproject.backcreateams.DTO.UserDataProfilDTO;
import com.myproject.backcreateams.DTO.UserUpdateDTO;
import com.myproject.backcreateams.models.UserEntity;
import com.myproject.backcreateams.services.*;
import com.myproject.backcreateams.repositories.*;

import java.util.Collections;
import java.util.HashMap;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")

public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final ContactRequestService contactRequestService;
    private final NotificationService notificationService;
    private final RequestMappingHandlerMapping requestMappingHandlerMapping;

    public UserController(UserService userService,
            UserRepository userRepository,
            RequestMappingHandlerMapping requestMappingHandlerMapping,
            ContactRequestService contactRequestService,
            NotificationService notificationService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.contactRequestService = contactRequestService;
        this.requestMappingHandlerMapping = requestMappingHandlerMapping;
    }

    // Create user
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody UserCreateDTO userCreateDTO,
            HttpServletResponse response) {
        try {
            if (userService.doesUserExistByEmail(userCreateDTO.getMail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("message", "Email déjà existant"));
            }

            Map<String, Object> userData = userService.createUser(userCreateDTO);
            Map<String, Object> userCreatedData = userService.getUserPseudoAndIdByMail(userCreateDTO.getMail());
            System.out.println(userCreatedData);

            return ResponseEntity.ok(userData);
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update User Datas
    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateUser(@RequestBody UserUpdateDTO UserUpdateDTO,
            HttpServletResponse response) {
        System.out.println(UserUpdateDTO);
        try {
            String oldMail = userService.getUserMailById(UserUpdateDTO.getId());

            if (userService.doesUserExistByEmail(UserUpdateDTO.getMail()) && !oldMail.equals(UserUpdateDTO.getMail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("message", "Email déjà existant"));
            }

            Map<String, Object> userData = userService.updateUser(UserUpdateDTO);
            System.out.println("User data here");
            System.out.println(userData);

            return ResponseEntity.ok(userData);
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Return user pseudo and id for the cookie connect in Front
    @GetMapping("/connect")
    public ResponseEntity<Map<String, Object>> connectUser(@RequestParam String mail, @RequestParam String password) {
        try {
            if (userService.doesUserExistByEmail(mail)) {
                UserEntity user = userRepository.findByMail(mail);

                if (userService.comparePassword(password, user.getPassword())) {
                    Map<String, Object> userData = userService.getUserPseudoAndIdByMail(mail);
                    return ResponseEntity.ok(userData);
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(Collections.singletonMap("message", "Mot de passe incorrect"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("message", "Utilisateur non trouvé"));
            }
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get the datas user by Id
    @GetMapping("/getDataUser")
    public ResponseEntity<UserDataProfilDTO> getDataUserById(@RequestParam Long userId) {
        System.out.println(userId);
        try {
            if (userService.doesUserExistById(userId)) {
                UserDataProfilDTO userData = userService.getUserDataById(userId);
                return ResponseEntity.ok(userData);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Ou ResponseEntity.notFound().build()
            }
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/sendContactRequest")
    public ResponseEntity<String> sentContactRequest(@RequestParam Long senderId, @RequestParam Long receiverId) {

        try {
            UserEntity sender = userService.getUserBasicDataById(senderId);
            UserEntity receiver = userService.getUserBasicDataById(receiverId);

            if (sender != null && receiver != null) {
                contactRequestService.sendContactRequest(sender, receiver);
                notificationService.createNotification(userRepository.findById(receiverId).orElse(null));
                return ResponseEntity.ok("Demande de contact envoyée avec succès.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Utilisateur non trouvé.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'envoi de la demande de contact.");
        }

    }

    // For check all my routes if dont work
    @GetMapping("/routes")
    public Map<String, String> getRoutes() {
        Map<RequestMappingInfo, HandlerMethod> handlerMethods = requestMappingHandlerMapping.getHandlerMethods();
        Map<String, String> simplifiedRoutes = new HashMap<>();
        for (Map.Entry<RequestMappingInfo, HandlerMethod> entry : handlerMethods.entrySet()) {
            RequestMappingInfo mappingInfo = entry.getKey();
            HandlerMethod handlerMethod = entry.getValue();
            simplifiedRoutes.put(mappingInfo.toString(), handlerMethod.toString());
        }
        return simplifiedRoutes;
    }
}
