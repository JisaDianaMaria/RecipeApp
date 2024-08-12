package com.example.demo;

import com.example.demo.model.Ingredient;
import com.example.demo.model.Recipe;
import com.example.demo.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class Demo2Application implements CommandLineRunner {

	@Autowired
	private RecipeRepository recipeRepository;

	public static void main(String[] args) {
		SpringApplication.run(Demo2Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		Ingredient ingr = new Ingredient("Eggs", "2");

		Recipe carbonara = new Recipe("Spaghetti-Carbonara", Arrays.asList(
				new Ingredient("Spaghetti", "200g"),
				new Ingredient("Pancetta", "100g"),
				ingr,
				new Ingredient("Cheese", "50g"),
				new Ingredient("Black pepper", "To taste")
		), "Cook spaghetti, fry pancetta, mix eggs with cheese, combine all.", 10, 8.99);

		Recipe curry = new Recipe("Chicken-Curry", Arrays.asList(
				new Ingredient("Chicken", "500g"),
				new Ingredient("Onion", "1"),
				new Ingredient("Curry powder", "2 tbsp"),
				new Ingredient("Coconut milk", "400ml")
		), "Sauté onion, add chicken and curry, pour coconut milk, simmer.", 15, 9.99);

		Recipe chocolateCake = new Recipe("Chocolate-Cake", Arrays.asList(
				new Ingredient("Flour", "200g"),
				new Ingredient("Sugar", "100g"),
				new Ingredient("Cocoa powder", "50g"),
				ingr
		), "Mix ingredients, bake in oven.", 20, 12.99);

		Recipe caesarSalad = new Recipe("Caesar-Salad", Arrays.asList(
				new Ingredient("Romaine lettuce", "1 head"),
				new Ingredient("Croutons", "1 cup"),
				new Ingredient("Caesar dressing", "To taste"),
				ingr
		), "Toss lettuce with croutons and dressing.", 30, 6.99);

		Recipe guacamole = new Recipe("Guacamole", Arrays.asList(
				new Ingredient("Avocado", "2"),
				new Ingredient("Tomato", "1"),
				new Ingredient("Onion", "1/2"),
				new Ingredient("Lime juice", "1 tbsp"),
				new Ingredient("Salt", "To taste"),
				new Ingredient("Cilantro", "To taste")
		), "Mash avocados, mix with chopped tomato, onion, lime juice, salt, and cilantro.", 25, 4.99);

		recipeRepository.saveAll(Arrays.asList(carbonara, curry, chocolateCake, caesarSalad, guacamole));
	}
}
