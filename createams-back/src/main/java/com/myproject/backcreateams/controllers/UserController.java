package com.myproject.backcreateams.controllers;

import java.util.Map;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerMethod;

import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.myproject.DTO.UserCreateDTO;
import com.myproject.DTO.UserConnectDTO;
import com.myproject.backcreateams.services.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashMap;


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")

public class UserController {
    private final UserService userService;
    private final RequestMappingHandlerMapping requestMappingHandlerMapping;
    // Injectez le service via le constructeur
    public UserController(UserService userService, RequestMappingHandlerMapping requestMappingHandlerMapping) {
        this.userService = userService;
        this.requestMappingHandlerMapping = requestMappingHandlerMapping;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody UserCreateDTO userCreateDTO, HttpServletResponse response) {
        try {
            // Vérifier si un utilisateur existe déjà avec cet email
            if (userService.doesUserExistByEmail(userCreateDTO.getMail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Email déjà existant"));
            }
    
            // Créer l'utilisateur si l'email n'existe pas encore
            Map<String, Object> userData = userService.createUser(userCreateDTO);
    
            // Obtenir les données de l'utilisateur par e-mail
            Map<String, Object> userCreatedData = userService.getUserDataByMail(userCreateDTO.getMail());
            System.out.println(userCreatedData);
    
            // Créer un cookie
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonDataUserCreate = objectMapper.writeValueAsString(userCreatedData);
            String encodedCookieValue = URLEncoder.encode(jsonDataUserCreate, StandardCharsets.UTF_8.toString());
    
            Cookie userCookie = new Cookie("user", encodedCookieValue);
            userCookie.setMaxAge(24 * 60 * 60); // 1 jour
            userCookie.setPath("/");
    
            // Ajouter le cookie à la réponse
            response.addCookie(userCookie);
    
            return ResponseEntity.ok(userData);
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/connect/{mail}/{password}")
    public ResponseEntity<Map<String, Object>> connectUser(@RequestBody UserConnectDTO UserConnectDTO, HttpServletResponse response) {
        if (!userService.doesUserExistByEmail(UserConnectDTO.getMail())) {

        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Utilisateur non trouvé"));
        }

        return null;
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