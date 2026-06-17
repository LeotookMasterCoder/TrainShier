package com.trainshier.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * @param transaction request
 */
@Data
public class TransactionRequest {

    @NotNull
    private Long userId;

    @NotNull
    @Positive
    private Double total;

    @NotBlank
    private String status;

    @NotBlank
    private String paymentMethod;

    @NotNull
    @Positive
    private Double duration;
}
