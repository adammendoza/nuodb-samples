/* Copyright (c) 2013 NuoDB, Inc. */

package com.nuodb.storefront.service;

import java.util.List;

import com.nuodb.storefront.model.Product;

public interface IDataGeneratorService {
    public void generateAll(int numCustomers, int numProducts, int maxCategoriesPerProduct, int maxReviewsPerProduct);

    /**
     * Generates customers and reviews for the associated products.
     * 
     * @param numCustomers
     *            Number of customers to generate
     * @param products
     *            Products to associate with reviews
     * @param maxReviewsPerProduct
     *            Upper bound on reviews to generate per product in the list. The lower bound is 0, and the exact number is chosen randomly between
     *            this range (inclusive) with equal likelihood. The customer chosen to write each review is randomy selected by the customers
     *            generated by this method. If no customers were generated, no reviews are written.
     */
    public void generateProductReviews(int numCustomers, List<Product> products, int maxReviewsPerProduct);
}