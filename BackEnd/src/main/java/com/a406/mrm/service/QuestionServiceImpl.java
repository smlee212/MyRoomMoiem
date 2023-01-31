package com.a406.mrm.service;

import com.a406.mrm.model.dto.*;
import com.a406.mrm.model.entity.Board;
import com.a406.mrm.model.entity.Question;
import com.a406.mrm.repository.BoardRepository;
import com.a406.mrm.repository.CategorySubRepository;
import com.a406.mrm.repository.QuestionRepository;
import com.a406.mrm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuestionServiceImpl implements QuestionService{

    private final QuestionRepository questionRepository;
    private final CategorySubRepository categorySubRepository;
    private final UserRepository userRepository;

    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository, CategorySubRepository categorySubRepository, UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.categorySubRepository = categorySubRepository;
        this.userRepository = userRepository;
    }

    @Override
    public QuestionInsertDto join(QuestionInsertDto questionInsertDto, int categorysub_id, String user_id) {
        Question question = new Question(questionInsertDto,categorySubRepository.findById(categorysub_id), userRepository.findById(user_id).get());
        return new QuestionInsertDto(questionRepository.save(question));
    }

    @Override
    public String delete(int id, String user_id) {
        if (questionRepository.findById(id).getUser().getId().equals(user_id)){
            questionRepository.deleteById(id);
            return "OK";
        }else{
            return "Fail";
        }
    }

    @Override
    public QuestionModifyDto update(QuestionModifyDto questionModifyDto, int question_id, String user_id) {
        if (questionRepository.findById(question_id).getUser().getId().equals(user_id)){
            Question question = questionRepository.findById(question_id);
            question.setTitle(questionModifyDto.getTitle());
            question.setContent(questionModifyDto.getContent());
            question.setPicture(questionModifyDto.getPicture());
            question.setStatus(questionModifyDto.getStatus());
            return new QuestionModifyDto(questionRepository.save(question));
        }else{
            return null;
        }
    }

    @Override
    public Page<QuestionResponseDto> listQuestion_Pageable(int categorysub_id, Pageable pageable) {
        return questionRepository.findBycategorySub_Id(categorysub_id, pageable);
    }

    @Override
    public List<QuestionResponseAnswerDto> listQuestion(int question_id) {
        List<QuestionResponseAnswerDto> result = questionRepository.findByid(question_id)
                .stream()
                .map(x -> new QuestionResponseAnswerDto(x)).collect(Collectors.toList());
        return result;
    }


}