package com.trainshier.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "instructor_comments")
@Data
public class InstructorComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String comment;

    private Double score;

    private LocalDateTime date;

    @ManyToOne
    private Transaction transaction;

    @ManyToOne
    private User instructor;
}