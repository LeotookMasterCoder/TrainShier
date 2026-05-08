package com.trainshier.security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.trainshier.enums.RolEnum;

@Target (ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequiresRol{
    RolEnum[] value();
}

