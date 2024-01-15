package com.myproject.backcreateams.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.myproject.backcreateams.models.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findById(int id);
    UserEntity findByMail(String mail);
    
}
