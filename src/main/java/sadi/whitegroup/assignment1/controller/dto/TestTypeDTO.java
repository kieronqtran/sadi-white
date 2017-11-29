package sadi.whitegroup.assignment1.controller.dto;

import sadi.whitegroup.assignment1.entity.Testing;

public class TestTypeDTO {
    private Long id;
    private String type;
    private String name;

    public TestTypeDTO() {
    }

    public TestTypeDTO(Testing test) {
        id = test.getId();
        type = test.getType();
        name = test.getName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
