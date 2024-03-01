package com.myproject.backcreateams.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.myproject.backcreateams.DTO.UserBasicDataDTO;
import com.myproject.backcreateams.DTO.UserCreateDTO;
import com.myproject.backcreateams.DTO.UserDataProfilDTO;
import com.myproject.backcreateams.DTO.UserProjectDTO;
import com.myproject.backcreateams.DTO.UserUpdateDTO;
import com.myproject.backcreateams.models.UserEntity;
import com.myproject.backcreateams.repositories.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    // constructor 
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Map<String, Object> createUser(UserCreateDTO userCreateDTO) {
        UserEntity userEntity = new UserEntity();
        String hashedPassword = passwordEncoder.encode(userCreateDTO.getPassword());

        userEntity.setPseudo(userCreateDTO.getPseudo());
        userEntity.setMail(userCreateDTO.getMail());
        userEntity.setPassword(hashedPassword);
        userEntity.setPremium(false);

        userEntity = userRepository.save(userEntity);

        Map<String, Object> response = new HashMap<>();
        response.put("id", userEntity.getId());
        response.put("pseudo", userEntity.getPseudo());

        return response;
    }

    // Update user
    public Map<String, Object> updateUser(UserUpdateDTO userUpdateDTO) {
        Optional<UserEntity> optionalUserEntity = userRepository.findById(userUpdateDTO.getId());

        if (optionalUserEntity.isPresent()) {
            UserEntity oldUserEntity = optionalUserEntity.get();

            oldUserEntity.setName(userUpdateDTO.getName());
            oldUserEntity.setSurname(userUpdateDTO.getSurname());
            oldUserEntity.setPseudo(userUpdateDTO.getPseudo());
            oldUserEntity.setMail(userUpdateDTO.getMail());
            oldUserEntity.setJob(userUpdateDTO.getJob());

            userRepository.save(oldUserEntity);

            Map<String, Object> response = new HashMap<>();
            response.put("name", oldUserEntity.getName());
            response.put("surname", oldUserEntity.getSurname());
            response.put("pseudo", oldUserEntity.getPseudo());
            response.put("mail", oldUserEntity.getMail());
            response.put("job", oldUserEntity.getJob());

            return response;
        } else {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID : " + userUpdateDTO.getId());
        }
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

    // get User Mail By Id
    public String getUserMailById(Long id) {
        Optional<UserEntity> userOptional = userRepository.findById(id);
        
        if (userOptional.isPresent()) {
            return userOptional.get().getMail();
        }
    
        return null;
    }

    // get Datas user by Id
    public UserDataProfilDTO getUserDataById(Long id) {
        Optional<UserEntity> userOptional = userRepository.findById(id);
        UserDataProfilDTO userData = new UserDataProfilDTO();
    
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
    
            userData.setId(user.getId());
            userData.setPseudo(user.getPseudo());
            userData.setMail(user.getMail());
            userData.setName(user.getName());
            userData.setSurname(user.getSurname());
            userData.setImage(user.getImage());
            userData.setMentor(user.getMentor());
            userData.setJob(user.getJob());
            userData.setPremium(user.getPremium());
    
            // Convertir la liste d'entités de projet en liste de DTO de projet
            List<UserProjectDTO> projectDTOs = user.getProjects().stream()
                    .map(projectEntity -> {
                        UserProjectDTO projectDTO = new UserProjectDTO();
                        projectDTO.setId(projectEntity.getId());
                        projectDTO.setProjectName(projectEntity.getProjectName());
                        projectDTO.setDescription(projectEntity.getDescription());

                        return projectDTO;
                    })
                    .collect(Collectors.toList());
    
            userData.setProjects(projectDTOs);
    
            List<UserBasicDataDTO> UserBasicDataDTOs = user.getContacts().stream()
                    .map(userContactEntity -> {
                        UserBasicDataDTO UserBasicDataDTO = new UserBasicDataDTO();
                        UserBasicDataDTO.setId(userContactEntity.getId());
                        UserBasicDataDTO.setPseudo(userContactEntity.getPseudo());
                        UserBasicDataDTO.setMail(userContactEntity.getMail());
                        UserBasicDataDTO.setSurname(userContactEntity.getSurname());
                        UserBasicDataDTO.setName(userContactEntity.getName());

                        return UserBasicDataDTO;
                    })
                    .collect(Collectors.toList());
    
            userData.setContacts(UserBasicDataDTOs);
        }
    
        return userData;
    }
    

    // get Datas user by Id
    public UserEntity getUserBasicDataById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    public boolean comparePassword(String passwordParams, String passwordOfDB) {
        boolean passwordsMatches = passwordEncoder.matches(passwordParams, passwordOfDB);
        return passwordsMatches;
    }

    public boolean doesUserExistById(Long id) {
        Optional<UserEntity> userOptional = userRepository.findById(id);
        return userOptional.isPresent();
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
