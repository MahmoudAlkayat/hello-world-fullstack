package com.example.helloworldapi.controller;

import com.example.helloworldapi.entity.HelloWorldEntity;
import com.example.helloworldapi.service.HelloWorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hellos")
@CrossOrigin(origins = "http://localhost:4200")
public class HelloWorldController {

    private final HelloWorldService helloWorldService;

    @Autowired
    public HelloWorldController(HelloWorldService helloWorldService) {
        this.helloWorldService = helloWorldService;
    }

    @GetMapping("/all")
    public List<HelloWorldEntity> getAllEntities() {
        return helloWorldService.getAllEntities();
    }

    @GetMapping("/{id}")
    public HelloWorldEntity getEntityById(@PathVariable Long id) {
        return helloWorldService.getEntityById(id);
    }

    @PostMapping("/create")
    public HelloWorldEntity createEntity(@RequestBody HelloWorldEntity entity) {
        return helloWorldService.createEntity(entity);
    }

    @PutMapping("/update/{id}")
    public void updateHelloWorldEntity(@PathVariable Long id, @RequestParam String mood, @RequestParam Integer lvl) {
        helloWorldService.updateMoodAndLevelByID(id, mood, lvl);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEntity(@PathVariable Long id) {
        helloWorldService.deleteEntity(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/mood/{mood}")
    public List<HelloWorldEntity> getEntitiesByMood(@PathVariable String mood) {
        return helloWorldService.getByMood(mood);
    }

    @GetMapping("/level/{level}")
    public List<HelloWorldEntity> getEntitiesByLevel(@PathVariable Integer level) {
        return helloWorldService.getByLevel(level);
    }

    @GetMapping("/mood-and-level")
    public List<HelloWorldEntity> getEntitiesByMoodAndLevel(
            @RequestParam String mood, 
            @RequestParam Integer level) {
        return helloWorldService.getByMoodAndLevel(mood, level);
    }

    @GetMapping("/mood-or-level")
    public List<HelloWorldEntity> getEntitiesByMoodOrLevel(
            @RequestParam String mood, 
            @RequestParam Integer level) {
        return helloWorldService.getByMoodOrLevel(mood, level);
    }

    @GetMapping("/mood-and-level-greater-than")
    public List<HelloWorldEntity> getEntitiesByMoodAndLevelGreaterThan(
            @RequestParam String mood, 
            @RequestParam Integer level) {
        return helloWorldService.getByMoodAndLevelGreaterThan(mood, level);
    }
}
