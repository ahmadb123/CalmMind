package com.calmmind.backend.repository.PartnerAttachmentStyleTestRepo;
import org.springframework.data.jpa.repository.JpaRepository;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuizResponse;
import com.calmmind.backend.model.User;
import java.util.List;
public interface PartnerStyleQuizResponseRepository extends JpaRepository<PartnerStyleQuizResponse, Long>{
   List<PartnerStyleQuizResponse> findByUser(User user);
}