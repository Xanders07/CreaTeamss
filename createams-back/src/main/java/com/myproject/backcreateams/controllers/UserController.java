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

import com.myproject.DTO.UserCreateDTO;
import com.myproject.DTO.UserUpdateDTO;
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
    private final RequestMappingHandlerMapping requestMappingHandlerMapping;

    public UserController(UserService userService, UserRepository userRepository, RequestMappingHandlerMapping requestMappingHandlerMapping) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.requestMappingHandlerMapping = requestMappingHandlerMapping;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody UserCreateDTO userCreateDTO, HttpServletResponse response) {
        try {

            if (userService.doesUserExistByEmail(userCreateDTO.getMail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Email déjà existant"));
            }
    
            Map<String, Object> userData = userService.createUser(userCreateDTO);
    
            Map<String, Object> userCreatedData = userService.getUserPseudoIdByMail(userCreateDTO.getMail());
            System.out.println(userCreatedData);
    
            return ResponseEntity.ok(userData);
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateUser(@RequestBody UserUpdateDTO UserUpdateDTO, HttpServletResponse response) {
        System.out.println(UserUpdateDTO);

        try {

            String oldMail = userService.getUserMailById(UserUpdateDTO.getId());

            System.out.println("qzdzqdzqdzqddddddddddddddddddddddd");
            System.out.println(UserUpdateDTO);

            System.out.println("equal");
            
            System.out.println( !oldMail.equals(UserUpdateDTO.getMail()));
            System.out.println("exist");
            System.out.println( userService.doesUserExistByEmail(UserUpdateDTO.getMail()) );

            if (userService.doesUserExistByEmail(UserUpdateDTO.getMail()) && !oldMail.equals(UserUpdateDTO.getMail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Email déjà existant"));
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

    @GetMapping("/connect")
    public ResponseEntity<Map<String, Object>> connectUser(@RequestParam String mail, @RequestParam String password) {
        try {

            if (userService.doesUserExistByEmail(mail)) {
                UserEntity user = userRepository.findByMail(mail);

                if (userService.comparePassword(password, user.getPassword())) {

                    Map<String, Object> userData = userService.getUserPseudoIdByMail(mail);

                    return ResponseEntity.ok(userData);
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Mot de passe incorrect"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Utilisateur non trouvé"));
            }
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getDataUser")
    public ResponseEntity<Map<String, Object>> connectUser(@RequestParam Long userId) {
        System.out.println(userId);
        try {
            if (userService.doesUserExistById(userId)) {

                Map<String, Object> userData = userService.getUserDataById(userId);

                return ResponseEntity.ok(userData);

            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Utilisateur non trouvé"));
            }
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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