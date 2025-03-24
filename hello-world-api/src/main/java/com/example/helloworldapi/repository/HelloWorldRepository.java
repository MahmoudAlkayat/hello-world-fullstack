package com.example.helloworldapi.repository;

import com.example.helloworldapi.entity.HelloWorldEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HelloWorldRepository extends JpaRepository<HelloWorldEntity, Long> {
    
    @Query("SELECT h FROM HelloWorldEntity h WHERE LOWER(h.mood) = LOWER(:mood)")
    List<HelloWorldEntity> findByMood(@Param("mood") String mood);
    
    List<HelloWorldEntity> findByLevel(Integer level);
    
    @Query("SELECT h FROM HelloWorldEntity h WHERE LOWER(h.mood) = LOWER(:mood) AND h.level = :level")
    List<HelloWorldEntity> findByMoodAndLevel(@Param("mood") String mood, @Param("level") Integer level);
    
    @Query("SELECT h FROM HelloWorldEntity h WHERE LOWER(h.mood) = LOWER(:mood) OR h.level = :level")
    List<HelloWorldEntity> findByMoodOrLevel(@Param("mood") String mood, @Param("level") Integer level);
    
    @Query("SELECT h FROM HelloWorldEntity h WHERE LOWER(h.mood) = LOWER(:mood) AND h.level > :level")
    List<HelloWorldEntity> findByMoodAndLevelGreaterThan(@Param("mood") String mood, @Param("level") Integer level);

    @Modifying
    @Query("UPDATE HelloWorldEntity v SET v.mood = :mood, v.level = :lvl WHERE v.id = :id")
    void updateMoodAndLevelByID(@Param("id") Long id, @Param("mood") String mood, @Param("lvl") Integer lvl);
}
