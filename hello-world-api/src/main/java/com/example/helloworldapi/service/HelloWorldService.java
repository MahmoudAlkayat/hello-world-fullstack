package com.example.helloworldapi.service;

import com.example.helloworldapi.entity.HelloWorldEntity;
import com.example.helloworldapi.exception.HelloWorldException;
import com.example.helloworldapi.repository.HelloWorldRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class HelloWorldService {
    private static final Logger log = LoggerFactory.getLogger(HelloWorldService.class);
    private final HelloWorldRepository repository;

    @Autowired
    public HelloWorldService(HelloWorldRepository repository) {
        this.repository = repository;
    }

    public List<HelloWorldEntity> getAllEntities() {
        log.info("Fetching all Hello World entities");
        List<HelloWorldEntity> entities = repository.findAll();
        if (entities.isEmpty()) {
            throw new HelloWorldException("No entities found");
        }
        return entities;
    }

    public HelloWorldEntity getEntityById(Long id) {
        log.info("Fetching Hello World entity with id: {}", id);
        return repository.findById(id)
                .orElseThrow(() -> new HelloWorldException("Entity not found with id: " + id));
    }

    public HelloWorldEntity createEntity(HelloWorldEntity entity) {
        log.info("Creating new Hello World entity");
        return repository.save(entity);
    }

    public HelloWorldEntity updateEntity(Long id, HelloWorldEntity entity) {
        log.info("Updating Hello World entity with id: {}", id);
        HelloWorldEntity existingEntity = repository.findById(id)
                .orElseThrow(() -> new HelloWorldException("Entity not found with id: " + id));
        
        // Only update mood and level, preserve the original ID
        existingEntity.setMood(entity.getMood());
        existingEntity.setLevel(entity.getLevel());
        return repository.save(existingEntity);
    }

    @Transactional
    public void updateMoodAndLevelByID(Long id, String mood, Integer lvl) {
        log.info("Updating entity with id: {}, mood: {}, level: {}", id, mood, lvl);
        if (!repository.existsById(id)) {
            throw new HelloWorldException("Entity not found with id: " + id);
        }
        repository.updateMoodAndLevelByID(id, mood, lvl);
    }

    public void deleteEntity(Long id) {
        log.info("Deleting Hello World entity with id: {}", id);
        if (!repository.existsById(id)) {
            throw new HelloWorldException("Entity not found with id: " + id);
        }
        repository.deleteById(id);
    }

    public List<HelloWorldEntity> getByMood(String mood) {
        log.info("Fetching entities with mood: {}", mood);
        List<HelloWorldEntity> entities = repository.findByMood(mood);
        if (entities.isEmpty()) {
            throw new HelloWorldException("No entities found with mood: " + mood);
        }
        return entities;
    }

    public List<HelloWorldEntity> getByLevel(Integer level) {
        log.info("Fetching entities with level: {}", level);
        List<HelloWorldEntity> entities = repository.findByLevel(level);
        if (entities.isEmpty()) {
            throw new HelloWorldException("No entities found with level: " + level);
        }
        return entities;
    }

    public List<HelloWorldEntity> getByMoodAndLevel(String mood, Integer level) {
        log.info("Fetching entities with exact mood: {} and level: {}", mood, level);
        List<HelloWorldEntity> entities = repository.findByMoodAndLevel(mood, level);
        if (entities.isEmpty()) {
            throw new HelloWorldException("No entities found with mood: " + mood + " and level: " + level);
        }
        return entities;
    }

    public List<HelloWorldEntity> getByMoodOrLevel(String mood, Integer level) {
        log.info("Fetching entities with mood: {} or level: {}", mood, level);
        List<HelloWorldEntity> entities = repository.findByMoodOrLevel(mood, level);
        if (entities.isEmpty()) {
            throw new HelloWorldException("No entities found with mood: " + mood + " or level: " + level);
        }
        return entities;
    }

    public List<HelloWorldEntity> getByMoodAndLevelGreaterThan(String mood, Integer level) {
        log.info("Fetching entities with mood: {} and level greater than: {}", mood, level);
        List<HelloWorldEntity> entities = repository.findByMoodAndLevelGreaterThan(mood, level);
        if (entities.isEmpty()) {
            throw new HelloWorldException("No entities found with mood: " + mood + " and level greater than: " + level);
        }
        return entities;
    }
}
