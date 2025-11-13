package com.calmmind.backend.controller;

import com.calmmind.backend.dto.RegisterRequest;
import com.calmmind.backend.model.User;
import com.calmmind.backend.dto.LoginRequest;
import com.calmmind.backend.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
@RestController 
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final IUserService userService;

    public UserController(IUserService userService){
        this.userService = userService;
    }

    //*POST /api/users/register */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest requestUser){
        try{
            User user = userService.registerUser(
                requestUser.getUsername(),
                requestUser.getEmail(),
                requestUser.getPassword(),
                requestUser.getAttachmentStyle()
            );
            return ResponseEntity.ok(user);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // *LOGIN API CAN BE ADDED HERE* //
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        try{
            User user = userService.loginUser(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            );
            return ResponseEntity.ok(user);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    //* GET /api/users/{id}*/ 
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id){
        try{
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /*GET  api/users/username/{username} */
    @GetMapping("/username/{username}")
    public ResponseEntity<?> getUsername(@PathVariable String username){
        try{
            User user = userService.getUserByUsername(username);
            return ResponseEntity.ok(user);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /* GET api/users/check/{username} */
    public ResponseEntity<?> checkUsername(@PathVariable String username){
        boolean available = userService.isUsernameAvailable(username);
        return ResponseEntity.ok(available);
    }

    /* DELETE api/users/{id} */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        try{
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());    
        }
    }
}
