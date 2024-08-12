package com.example.demo.controller;

import com.example.demo.dto.OrderItem;
import com.example.demo.model.Recipe;
import com.example.demo.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping
    public Map<String, Object> getAllRecipes(@RequestParam(required = false) List<Long> ingredients,
                                             @RequestParam(required = false) Integer page,
                                             @RequestParam(required = false) Integer size) {
        List<Recipe> recipes;
        if (ingredients == null || ingredients.isEmpty()) {
            recipes = recipeRepository.findAll();
        } else {
            recipes = recipeRepository.findByIngredientIds(ingredients);
        }

        int totalRecipes = recipes.size();

        if (page != null && size != null) {
            int start = page * size;
            int end = Math.min(start + size, recipes.size());

            if (start > recipes.size()) {
                recipes = List.of();
            } else {
                recipes = recipes.subList(start, end);
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("recipes", recipes);
        response.put("totalRecipes", totalRecipes);

        return response;
    }

    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.orElse(null);
    }

    @PostMapping("/updateQuantity")
    public ResponseEntity<Void> updateRecipeQuantity(@RequestBody List<OrderItem> orderItems) {
        for (OrderItem item : orderItems) {
            Optional<Recipe> optionalRecipe = recipeRepository.findById(item.getRecipeId());
            if (optionalRecipe.isPresent()) {
                Recipe recipe = optionalRecipe.get();
                if (recipe.getQuantity() >= item.getQuantity()) {
                    recipe.setQuantity(recipe.getQuantity() - item.getQuantity());
                    recipeRepository.save(recipe);
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient quantity for " + recipe.getTitle());
                }
            }
        }
        return ResponseEntity.ok().build();
    }

}