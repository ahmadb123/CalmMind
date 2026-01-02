package com.calmmind.backend.config;

import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuestion;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuestion.AnswerOptions;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuiz;
import com.calmmind.backend.repository.UserStyleQuizRepo.UserStyleQuestionRepository;
import com.calmmind.backend.repository.UserStyleQuizRepo.UserStyleQuizRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class UserStyleQuizDataInitializer {

    private final UserStyleQuestionRepository questionRepository;
    private final UserStyleQuizRepository quizRepository;
    
    public UserStyleQuizDataInitializer(
            UserStyleQuestionRepository questionRepository,
            UserStyleQuizRepository quizRepository) {
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
    }
    
    @EventListener(ApplicationReadyEvent.class)
    public void initializeUserStyleQuiz() {
        // Only initialize if tables are empty
        if (questionRepository.count() > 0 || quizRepository.count() > 0) {
            System.out.println("User style quiz questions already exist. Skipping initialization.");
            return;
        }

        System.out.println("Initializing User Style Quiz...");

        // Step 1: Create the three answer options with their scoring descriptions
        UserStyleQuestion optionA = new UserStyleQuestion(
            AnswerOptions.A,
            "You tend to have an anxious attachment style. This means you may experience a strong need for closeness " +
            "and reassurance in relationships, often worrying about being abandoned or unloved. You might seek frequent " +
            "validation from your partner and feel anxious when they're not available. Understanding this can help you " +
            "recognize these patterns and work towards feeling more secure in your relationships."
        );
        
        UserStyleQuestion optionB = new UserStyleQuestion(
            AnswerOptions.B,
            "You tend to have a secure attachment style. This means you generally feel comfortable with intimacy and " +
            "independence in relationships. You can depend on others and allow others to depend on you without feeling " +
            "anxious or overwhelmed. You communicate your needs effectively and maintain healthy boundaries, which " +
            "contributes to satisfying and stable relationships."
        );
        
        UserStyleQuestion optionC = new UserStyleQuestion(
            AnswerOptions.C,
            "You tend to have an avoidant attachment style. This means you value independence and may feel uncomfortable " +
            "with too much closeness or emotional intimacy. You might have difficulty depending on others or allowing " +
            "others to depend on you. You may prefer to keep your feelings to yourself and maintain emotional distance. " +
            "Recognizing this pattern can help you work towards developing deeper connections when you're ready."
        );

        // Save the options
        optionA = questionRepository.save(optionA);
        optionB = questionRepository.save(optionB);
        optionC = questionRepository.save(optionC);

        // Step 2: Create all quiz questions
        UserStyleQuiz[] questions = {
            // Page 1 questions
            q("I often worry that my partner will stop loving me.", optionA, 1),
            q("I find it easy to be affectionate with my partner.", optionB, 2),
            q("I fear that once someone gets to know the real me, they won't like who I am.", optionA, 3),
            q("I find that I bounce back quickly after a breakup. It's weird how I can just put someone out of my mind.", optionC, 4),
            q("When I'm not involved in a relationship, I feel somewhat anxious and incomplete.", optionA, 5),
            q("I find it difficult to emotionally support my partner when they are feeling down.", optionC, 6),
            q("When my partner is away, I'm afraid that they might become interested in someone else.", optionA, 7),
            
            // Page 2 questions
            q("I feel comfortable depending on romantic partners.", optionB, 8),
            q("My independence is more important to me than my relationships.", optionC, 9),
            q("I prefer not to share my innermost feelings with my partner.", optionC, 10),
            q("When I show my partner how I feel, I'm afraid they will not feel the same about me.", optionA, 11),
            q("I am generally satisfied with my romantic relationships.", optionB, 12),
            q("I don't feel the need to act out much in my romantic relationships.", optionB, 13),
            q("I think about my relationships a lot.", optionA, 14),
            q("I find it difficult to depend on romantic partners.", optionC, 15),
            q("I tend to get very quickly attached to a romantic partner.", optionA, 16),
            q("I have little difficulty expressing my needs and wants to my partner.", optionB, 17),
            q("I sometimes feel angry or annoyed with my partner without knowing why.", optionC, 18),
            q("I am very sensitive to my partner's moods.", optionA, 19),
            q("I believe most people are essentially honest and dependable.", optionC, 20),
            q("I prefer casual sex with uncommitted partners to intimate sex with one person.", optionB, 21),
            q("I'm comfortable sharing my personal thoughts and feelings with my partner.", optionB, 22),
            
            // Page 3 questions
            q("I worry that if my partner leaves me I might never find someone else.", optionA, 23),
            q("It makes me nervous when my partner gets too close.", optionB, 24),
            q("During a conflict, I tend to impulsively do or say things I later regret, rather than be able to reason about things.", optionA, 25),
            q("An argument with my partner doesn't usually cause me to question our entire relationship.", optionB, 26),
            q("My partners often want me to be more intimate than I feel comfortable being.", optionB, 27),
            q("I worry that I'm not attractive enough.", optionA, 28),
            q("Sometimes people see me as boring because I create little drama in relationships.", optionB, 29),
            q("I miss my partner when we're apart, but then when we're together I feel the need to escape.", optionB, 30),
            q("When I disagree with someone, I feel comfortable expressing my opinions.", optionC, 31),
            q("I hate feeling that other people depend on me.", optionB, 32),
            q("If I notice that someone I'm interested in is checking out other people, I don't let it faze me. I might feel a pang of jealousy, but it's fleeting.", optionA, 33),
            q("If I notice that someone I'm interested in is checking out other people, I feel relieved—it means they're not looking to make things exclusive.", optionC, 34),
            q("If I notice that someone I'm interested in is checking out other people, it makes me feel depressed.", optionA, 35),
            q("If someone I've been dating begins to act cold and distant, I may wonder what's happened, but I'll know it's probably not about me.", optionC, 36),
            
            // Page 4 questions
            q("If someone I've been dating begins to act cold and distant, I'll probably be indifferent; I might even be relieved.", optionC, 37),
            q("If someone I've been dating begins to act cold and distant, I'll worry that I've done something wrong.", optionA, 38),
            q("If my partner was to break up with me, I'd try my best to show them what they're missing (a little jealousy can't hurt).", optionB, 39),
            q("If someone I've been dating for several months tells me they want to stop seeing me, I'd feel hurt at first, but I'd get over it.", optionB, 40),
            q("Sometimes when I get what I want in a relationship, I'm not sure what I want anymore.", optionC, 41),
            q("I won't have much of a problem staying in touch with my ex (strictly platonic)—after all, we have a lot in common.", optionC, 42)
        };

        // Save all questions
        for (UserStyleQuiz question : questions) {
            quizRepository.save(question);
        }

        System.out.println("User Style Quiz initialized successfully with " + questions.length + " questions!");
    }

    // Helper method to create quiz questions
    private UserStyleQuiz q(String questionText, UserStyleQuestion questionOptionAnswer, Integer questionNum) {
        return new UserStyleQuiz(questionText, questionOptionAnswer, questionNum);
    }
}