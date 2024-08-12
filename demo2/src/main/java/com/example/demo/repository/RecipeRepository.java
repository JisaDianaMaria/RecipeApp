package com.example.demo.repository;

import com.example.demo.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByIngredientsNameIn(List<String> ingredients);

    @Query("SELECT DISTINCT r FROM Recipe r JOIN r.ingredients i WHERE i.id IN :ingredientIds")
    List<Recipe> findByIngredientIds(List<Long> ingredientIds);

    List<Recipe> findDistinctByIngredientsIdIn(List<Long> ingredientIds);


}