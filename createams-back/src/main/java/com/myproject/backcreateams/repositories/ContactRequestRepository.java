package com.myproject.backcreateams.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myproject.backcreateams.models.ContactRequestEntity;

@Repository
public interface ContactRequestRepository extends JpaRepository<ContactRequestEntity, Long> {
    Optional<ContactRequestEntity> findById(Long id);    
}

