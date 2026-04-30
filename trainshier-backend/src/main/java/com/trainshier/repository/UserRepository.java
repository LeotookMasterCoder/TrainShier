package com.trainshier.repository;

import com.trainshier.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @param user repository
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * @param email user email
     * @return user
     */
    Optional<User> findByEmail(String email);
}