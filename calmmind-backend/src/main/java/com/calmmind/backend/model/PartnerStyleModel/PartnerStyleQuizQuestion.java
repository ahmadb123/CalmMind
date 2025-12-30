package com.calmmind.backend.model.PartnerStyleModel;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
/*
    Entity class represents partner quiz style
*/
@Entity 
@Table(name = "partner_style_quiz_questions")
public class PartnerStyleQuizQuestion{
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* question group FK -> question_group.id */
   @ManyToOne
   @JoinColumn(name = "question_group_id", nullable = false)
   private PartnerStyleQuestionGroup questionGroup;

   @Column(nullable = false, length = 500)
   private String questionText;

   @ElementCollection
   @CollectionTable(name = "question_descriptions", joinColumns = @JoinColumn(name = "question_id"))
   @Column(name = "description")
   private List<String> questionDescription;
   
   @Column(nullable = false)
   private Integer questionNum;

   @Column(name = "created_at")
   private LocalDateTime createAt = LocalDateTime.now();

   // Constructors, Getters, and Setters

   public PartnerStyleQuizQuestion (){}

   public PartnerStyleQuizQuestion(String questionText, PartnerStyleQuestionGroup questionGroup, List<String> questionDescription, Integer questionNum){
        this.questionText = questionText;
        this.questionDescription = questionDescription;
        this.questionGroup = questionGroup;
        this.questionNum = questionNum;
   }

   /*GETTERS AND SETTERS */

   public Long getId() {
       return id;
   }

   public void setId(Long id) {
       this.id = id;
   }

   public String getQuestionText() {
       return questionText;
   }

   public void setQuestionText(String questionText) {
       this.questionText = questionText;
   }

   public List<String> getQuestionDescription() {
       return questionDescription;
   }

   public void setQuestionDescription(List<String> questionDescription) {
       this.questionDescription = questionDescription;
   }

   public Integer getQuestionNum() {
       return questionNum;
   }

   public void setQuestionNum(Integer questionNum) {
       this.questionNum = questionNum;
   }

   public PartnerStyleQuestionGroup getQuestionGroup() {
       return questionGroup;
   }

   public void setQuestionGroup(PartnerStyleQuestionGroup questionGroup) {
       this.questionGroup = questionGroup;
   }

   public LocalDateTime getCreateAt() {
       return createAt;
   }

   public void setCreateAt(LocalDateTime createAt) {
       this.createAt = createAt;
   }
}