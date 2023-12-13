package com.myproject.backcreateams.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.myproject.backcreateams.services.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // Injectez le service via le constructeur
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // @PostMapping("/")
    // public ResponseEntity<String> createUser(@RequestBody UserDTO userDTO) {
    //     try {
    //         String result = userService.createUser(userDTO);
    //         return ResponseEntity.ok(result);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la création de l'utilisateur");
    //     }
    // }
}
