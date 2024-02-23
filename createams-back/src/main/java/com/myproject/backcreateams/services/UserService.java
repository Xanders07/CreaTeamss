package com.myproject.backcreateams.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.myproject.DTO.UserCreateDTO;
import com.myproject.DTO.UserUpdateDTO;
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

    // Update user
    public Map<String, Object> updateUser(UserUpdateDTO UserUpdateDTO) {

        System.out.println("UserUpdateDTO");
        System.out.println(UserUpdateDTO);

        UserEntity oldUserEntity = userRepository.findById(UserUpdateDTO.getId());

        oldUserEntity.setName(UserUpdateDTO.getName());
        oldUserEntity.setSurname(UserUpdateDTO.getSurname());
        oldUserEntity.setPseudo(UserUpdateDTO.getPseudo());
        oldUserEntity.setMail(UserUpdateDTO.getMail());
        oldUserEntity.setJob(UserUpdateDTO.getJob());
        oldUserEntity.setPassword(oldUserEntity.getPassword());

        oldUserEntity  = userRepository.save(oldUserEntity);

        Map<String, Object> response = new HashMap<>();

        response.put("name", oldUserEntity.getName());
        response.put("surname", oldUserEntity.getSurname());
        response.put("pseudo", oldUserEntity.getPseudo());
        response.put("mail", oldUserEntity.getMail());
        response.put("job", oldUserEntity.getJob());
        
        System.out.println("Ceci est la reponse user Service");
        System.out.println(response);
        return response;
    }

    // Get User Pseudo by Mail
    public Map<String, Object> getUserPseudoAndIdByMail(String mail) {
        UserEntity user = userRepository.findByMail(mail);
        
        Map<String, Object> userData = new HashMap<>();
        if (user != null) {
            userData.put("id", user.getId());
            userData.put("pseudo", user.getPseudo());
        }
    
        return userData;
    }

    public String getUserMailById(Long id) {
        UserEntity user = userRepository.findById(id);
        
        if (user != null) {
            return user.getMail();
        }
    
        return null;
    }
    

    public Map<String, Object> getUserDataById(Long id) {
        UserEntity user = userRepository.findById(id);
        
        Map<String, Object> userData = new HashMap<>();
        if (user != null) {
            userData.put("id", user.getId());
            userData.put("pseudo", user.getPseudo());
            userData.put("mail", user.getMail());
            userData.put("name", user.getName());
            userData.put("surname", user.getSurname());
            userData.put("image", user.getImage());
            userData.put("mentor", user.getMentor());
            userData.put("job", user.getJob());
            userData.put("premium", user.getPremium());
            userData.put("projects", user.getProjects());
            userData.put("follow", user.getFollowers());

        }
    
        return userData;
    }

    public boolean comparePassword(String passwordParams, String passwordOfDB) {
        boolean passwordsMatches = passwordEncoder.matches(passwordParams, passwordOfDB);
        return passwordsMatches;
    }

    public boolean doesUserExistById(Long id) {
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
