package com.a406.mrm.model.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@Entity
@Getter
@Setter
@Table(name="users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseTimeEntity{
    @Id
    private String id;
    private String password;
    private String email;
    private String name;
    private String nickname;

    private String profile;
    private String intro;
    private String memo;

    private String roles; // ROLE_USER, ROLE_ADMIN
    private String provider;
    private String providerId;

//    @ApiModelProperty("User - Room relation table mapping")
//    @OneToMany(mappedBy = "user")
//    private List<UserHasRoom> rooms = new ArrayList<>();

//    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
//    private List<Todo> todos = new ArrayList<>();

    public List<String> getRoleList(){
        if(this.roles.length() > 0){
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }
}
