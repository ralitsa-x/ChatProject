package com.chat.chat.views.auth;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import org.springframework.stereotype.Component;

@Component
@Route("register")
public class RegisterView extends VerticalLayout {
    public RegisterView() {
        addRegisterFields();
    }
    private void addRegisterFields(){
        TextField name = new TextField("Full Name");
        EmailField email = new EmailField("Email");
        PasswordField password = new PasswordField("Password");
        Button registerButton = new Button("Register");

        registerButton.addClickListener(event -> {
            // Add registration logic here
            System.out.println("Registered: " + name.getValue());
        });

        add(name, email, password, registerButton);
    }
}
