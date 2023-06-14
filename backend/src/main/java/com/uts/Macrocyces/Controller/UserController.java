package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Crypto.AESCryptoUtil;
import com.uts.Macrocyces.Entity.User;
import com.uts.Macrocyces.Exceptions.InvalidCredentialsException;
import com.uts.Macrocyces.Exceptions.ResourceNotFoundException;
import com.uts.Macrocyces.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private static final String SECRET_KEY = "SecretKey123456";


    @GetMapping("/")
    public ResponseEntity<Object> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", users);
            response.put("type", "success");
            response.put("message", "Lista de usuarios encontrada");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la lista de usuarios");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable("id") String id) {
        try {
            Optional<User> userOptional = userRepository.findById(id);
            if (userOptional.isEmpty()) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Usuario no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            User user = userOptional.get();

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", user);
            response.put("type", "success");
            response.put("message", "Usuario encontrado");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar el usuario");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody Map<String, Object> body) {
        try {
            String email = (String) body.get("email");
            String password = (String) body.get("password");

            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                throw new InvalidCredentialsException("Credenciales inválidas");
            }

            String decryptedPassword = AESCryptoUtil.decrypt(user.getPassword());

            if (password.equals(decryptedPassword)) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", user);
                response.put("type", "success");
                response.put("message", "Inicio de sesión exitoso");
                response.put("status", "OK");
                response.put("statusCode", HttpStatus.OK.value());

                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                throw new InvalidCredentialsException("La contraseña no coincide ");
            }
        } catch (InvalidCredentialsException ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.UNAUTHORIZED);
            response.put("statusCode", HttpStatus.UNAUTHORIZED.value());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @PostMapping("/login-google")
    public ResponseEntity<Object> loginGoogleUser(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            Optional<User> existingUserOptional = userRepository.findByEmail(email);
            if (existingUserOptional.isPresent()) {
                User existingUser = existingUserOptional.get();
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("user", existingUser);
                response.put("message", "Inicio de sesión exitoso");
                response.put("status", "OK");
                response.put("statusCode", HttpStatus.OK.value());
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setName("");
                newUser.setSurname("");
                newUser.setPassword("");
                userRepository.save(newUser);
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("user", newUser);
                response.put("message", "Usuario creado con éxito");
                response.put("status", "OK");
                response.put("statusCode", HttpStatus.OK.value());
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }




@PostMapping("")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        try {
            String encryptedPassword = AESCryptoUtil.encrypt(user.getPassword());
            user.setPassword(encryptedPassword);

            userRepository.save(user);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", user);
            response.put("type", "success");
            response.put("message", "Usuario creado exitosamente");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable("id") String id, @RequestBody User updatedUser) {
        try {
            User existingUser = userRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + id));

            existingUser.setName(updatedUser.getName());
            existingUser.setSurname(updatedUser.getSurname());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(AESCryptoUtil.encrypt(updatedUser.getPassword()));
            existingUser.setMacrocycles(updatedUser.getMacrocycles());

            User savedUser = userRepository.save(existingUser);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", savedUser);
            response.put("type", "success");
            response.put("message", "Usuario actualizado exitosamente");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (ResourceNotFoundException ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.NOT_FOUND);
            response.put("statusCode", HttpStatus.NOT_FOUND.value());

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> patchUpdateUser(@PathVariable String id, @RequestBody User updatedUser) {
        try {
            Optional<User> optionalUser = userRepository.findById(id);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();

                // Verificar si se proporciona un nombre actualizado en el cuerpo de la solicitud
                if (updatedUser.getName() != null) {
                    user.setName(updatedUser.getName());
                }

                // Verificar si se proporciona un apellido actualizado en el cuerpo de la solicitud
                if (updatedUser.getSurname() != null) {
                    user.setSurname(updatedUser.getSurname());
                }

                // Verificar si se proporciona un correo electrónico actualizado en el cuerpo de la solicitud
                if (updatedUser.getEmail() != null) {
                    user.setEmail(updatedUser.getEmail());
                }

                // Verificar si se proporciona una contraseña actualizada en el cuerpo de la solicitud
                if (updatedUser.getPassword() != null) {
                    user.setPassword(AESCryptoUtil.encrypt(updatedUser.getPassword()));
                }

                // Verificar si se proporciona una lista de macrociclos actualizada en el cuerpo de la solicitud
                if (updatedUser.getMacrocycles() != null) {
                    user.setMacrocycles(updatedUser.getMacrocycles());
                }

                User savedUser = userRepository.save(user);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedUser);
                response.put("type", "success");
                response.put("message", "Usuario actualizado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Usuario no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar el Usuario");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable("id") String id) {
        try {
            Optional<User> existingUser = userRepository.findById(id);
            if (!existingUser.isPresent()) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "No se pudo encontrar el usuario con el ID " + id);
                response.put("status", HttpStatus.NOT_FOUND);
                response.put("statusCode", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            userRepository.deleteById(id);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "success");
            response.put("message", "Usuario eliminado exitosamente");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al eliminar el usuario");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }





}
