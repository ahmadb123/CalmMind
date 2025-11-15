// package com.calmmind.backend.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.config.Customizer;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     private final AuthenticationConfiguration authenticationConfiguration;

//     public SecurityConfig(AuthenticationConfiguration authenticationConfiguration) {
//         this.authenticationConfiguration = authenticationConfiguration;
//     }

//     @Bean
//     public AuthenticationManager authenticationManager() throws Exception {
//         return authenticationConfiguration.getAuthenticationManager();
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         http
//                 .cors(Customizer.withDefaults())
//                 .csrf(csrf -> csrf.disable())
//                 .authorizeHttpRequests(auth -> auth
//                         .requestMatchers(
//                                 "/api/openai/**",   // 👈 allow ChatGPT endpoint
//                                 "/api/users/login", // allow login
//                                 "/api/users/register" // allow register
//                         ).permitAll()
//                         .anyRequest().authenticated()
//                 );

//         return http.build();
//     }
// }
