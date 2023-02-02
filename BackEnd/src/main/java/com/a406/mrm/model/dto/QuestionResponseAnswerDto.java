package com.a406.mrm.model.dto;

import com.a406.mrm.model.entity.Board;
import com.a406.mrm.model.entity.Question;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Getter
@Setter
@NoArgsConstructor
public class QuestionResponseAnswerDto {
    public QuestionResponseAnswerDto(Question question){
        this.id = question.getId();
        this.title = question.getTitle();
        this.content = question.getContent();
        this.createTime = question.getCreateTime();
        this.status = question.getStatus();
        this.user = question.getUser().getId();
        this.answers = question.getAnswers().stream().map(x -> x.getContent()).collect(Collectors.toList());
    }

    private int id;
    private String title;
    private String content;
    private Date createTime;
    private int status;
    private String user;
    private List<String> answers = new ArrayList<>();

}