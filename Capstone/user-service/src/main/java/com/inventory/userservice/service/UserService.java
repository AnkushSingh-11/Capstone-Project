package com.inventory.userservice.service;

import com.inventory.userservice.model.User;
import com.inventory.userservice.repository.UserRepository;
import com.inventory.userservice.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User loginUser(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password))  // ✅ Simple password check (no hashing)
                .orElseThrow(() -> new UserNotFoundException("Invalid credentials"));
    }
}
