package com.example.code.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByUserId(String userId) {
        return userRepository.findByUserId(userId);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public String generateNewIdx() {
        int maxIdx = userRepository.findMaxIdx();
        int newIdx = maxIdx + 1;
        return String.format("%04d", newIdx); // char(4) 형식으로 변환
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public void updateAuthority(String userId, String authority) {
        userRepository.updateAuthorityByUserId(userId, authority);
    }
}
