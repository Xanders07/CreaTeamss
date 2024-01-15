package com.myproject.backcreateams.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.myproject.DTO.UserCreateDTO;
import com.myproject.backcreateams.models.UserEntity;
import com.myproject.backcreateams.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    // Injectez le repository via le constructeur
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Map<String, Object> createUser(UserCreateDTO UserCreateDTO) {

        UserEntity userEntity = new UserEntity();
        String hashedPassword = passwordEncoder.encode(UserCreateDTO.getPassword());

        userEntity.setPseudo(UserCreateDTO.getPseudo());
        userEntity.setMail(UserCreateDTO.getMail());
        userEntity.setPassword(hashedPassword);
        userEntity.setPremium(false);

        userEntity  = userRepository.save(userEntity);

        Map<String, Object> response = new HashMap<>();

        response.put("id", userEntity.getId());
        response.put("pseudo", userEntity.getPseudo());

        return response;
    }

    public Map<String, Object> getUserDataConnectionByMail(String mail) {
        UserEntity user = userRepository.findByMail(mail);
        
        Map<String, Object> userData = new HashMap<>();
        if (user != null) {
            userData.put("id", user.getId());
            userData.put("pseudo", user.getPseudo());
        }
    
        return userData;
    }

    public Map<String, Object> getUserDataById(int id) {
        UserEntity user = userRepository.findById(id);
        
        Map<String, Object> userData = new HashMap<>();
        if (user != null) {
            userData.put("Id", user.getId());
            userData.put("Pseudo", user.getPseudo());
            userData.put("Mail", user.getMail());
            userData.put("Name", user.getName());
            userData.put("Surname", user.getSurname());
            userData.put("Image", user.getImage());
            userData.put("Mentor", user.getMentor());
            userData.put("Job", user.getJob());
        }
    
        return userData;
    }

    public boolean comparePassword(String passwordParams, String passwordOfDB) {
        boolean passwordsMatches = passwordEncoder.matches(passwordParams, passwordOfDB);
        return passwordsMatches;
    }

    public boolean doesUserExistById(int id) {
        UserEntity user = userRepository.findById(id);
        return user != null;
    }

    public boolean doesUserExistByEmail(String email) {
        UserEntity user = userRepository.findByMail(email);
        return user != null;
    }

    public boolean doesUserConnect(String email, String Password) {
        UserEntity user = userRepository.findByMail(email);
        return user != null;
    }
    
}
