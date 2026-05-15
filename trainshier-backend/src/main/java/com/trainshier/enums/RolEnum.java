package com.trainshier.enums;

public enum RolEnum {
    aprendiz(1L),
    instructor(2L),
    admin(3L);

    private final Long id;

    RolEnum(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
