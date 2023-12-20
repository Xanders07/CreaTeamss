package com.myproject.backcreateams.services;

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

    public String createUser(UserCreateDTO UserCreateDTO) {

        UserEntity userEntity = new UserEntity();
        String hashedPassword = passwordEncoder.encode(UserCreateDTO.getPassword());

        userEntity.setPseudo(UserCreateDTO.getPseudo());
        userEntity.setMail(UserCreateDTO.getMail());
        userEntity.setPassword(hashedPassword);
        userEntity.setPremium(false);

        userRepository.save(userEntity);

        return "Utilisateur créé avec succès! " + userEntity;
    }


}
