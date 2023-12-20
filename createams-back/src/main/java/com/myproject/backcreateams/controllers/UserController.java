package com.myproject.backcreateams.controllers;

import java.util.Map;

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
import com.myproject.DTO.UserCreateDTO;
import com.myproject.backcreateams.services.*;

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
    public ResponseEntity<String> createUser(@RequestBody UserCreateDTO UserCreateDTO) {
        try {
            String result = userService.createUser(UserCreateDTO);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la création de l'utilisateur");
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