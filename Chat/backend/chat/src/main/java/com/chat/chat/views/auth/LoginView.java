package com.chat.chat.views.auth;

import com.chat.chat.services.UserService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.Route;
import org.springframework.stereotype.Component;

@Route("login")
@Component
public class LoginView extends VerticalLayout {
    private final UserService userService;

    public LoginView(UserService userService) {
        this.userService = userService;
        createLoginForm();
    }
    private void createLoginForm(){
        TextField email = new TextField("Email");
        PasswordField password = new PasswordField("Password");
        Button loginButton = new Button("Login");
        loginButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        loginButton.addClickListener(event -> {
            userService.findByEmailAndPassword(email.getValue(),password.getValue());
        });
        add(email, password, loginButton);
    }

}
