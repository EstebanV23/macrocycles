package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "macrocycle")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Macrocycle {
    @MongoId
    private String id;
    private String name;
    private LocalDate start_date;
    private LocalDate end_date;

    private int type;

    private Component[] components;



    public static class  Component {
        private int amount;
        private String type;
        private int unitMeasure;
        private Mesocycles[] mesocycles;



        public Component() {
        }

        public Component(int amount, String type, int unitMeasure, Mesocycles[] mesocycles) {
            this.amount = amount;
            this.type = type;
            this.unitMeasure = unitMeasure;
            this.mesocycles = mesocycles;
        }

        public int getAmount() {
            return amount;
        }

        public void setAmount(int amount) {
            this.amount = amount;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public int getUnitMeasure() {
            return unitMeasure;
        }

        public void setUnitMeasure(int unitMeasure) {
            this.unitMeasure = unitMeasure;
        }

        public Mesocycles[] getMesocycles() {
            return mesocycles;
        }

        public void setMesocycles(List<Mesocycles> mesocycles) {
            this.mesocycles = mesocycles.toArray(new Mesocycles[0]);
        }

        public static class Mesocycles {
            private String type;
            private int percent;
            private int amount;
            private Microcycles[] microcycles;

            public Mesocycles() {
            }

            public Mesocycles(String type, int percent, int amount, Microcycles[] microcycles) {
                this.type = type;
                this.percent = percent;
                this.amount = amount;
                this.microcycles = microcycles;
            }

            public String getType() {
                return type;
            }

            public void setType(String type) {
                this.type = type;
            }

            public int getPercent() {
                return percent;
            }

            public void setPercent(int percent) {
                this.percent = percent;
            }

            public int getAmount() {
                return amount;
            }

            public void setAmount(int amount) {
                this.amount = amount;
            }

            public Microcycles[] getMicrocycles() {
                return microcycles;
            }

            public void setMicrocycles(List<Microcycles> microcycles) {
                this.microcycles = microcycles.toArray(new Microcycles[0]);
            }

            public static class Microcycles{
                private String type;
                private int percent;
                private int amount;

                public Microcycles() {
                }

                public Microcycles(String type, int percent, int amount) {
                    this.type = type;
                    this.percent = percent;
                    this.amount = amount;
                }

                public String getType() {
                    return type;
                }

                public void setType(String type) {
                    this.type = type;
                }

                public int getPercent() {
                    return percent;
                }

                public void setPercent(int percent) {
                    this.percent = percent;
                }

                public int getAmount() {
                    return amount;
                }

                public void setAmount(int amount) {
                    this.amount = amount;
                }
            }
        }
    }







    @DBRef
    private List<TimeFrame> time_frame;

    @DBRef
    private List<Stage> stages;

    @DBRef
    private List<Mesocycle> mesocycles;


    public Macrocycle() {
    }

    public Macrocycle(String name, LocalDate start_date, LocalDate end_date, int type, Component[] components, List<TimeFrame> time_frame, List<Stage> stages, List<Mesocycle> mesocycles) {
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.type = type;
        this.components = components;
        this.time_frame = time_frame;
        this.stages = stages;
        this.mesocycles = mesocycles;
    }

    public Macrocycle(String id, String name, LocalDate start_date, LocalDate end_date, int type, Component[] components, List<TimeFrame> time_frame, List<Stage> stages, List<Mesocycle> mesocycles) {
        this.id = id;
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.type = type;
        this.components = components;
        this.time_frame = time_frame;
        this.stages = stages;
        this.mesocycles = mesocycles;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDate start_date) {
        this.start_date = start_date;
    }

    public LocalDate getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDate end_date) {
        this.end_date = end_date;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public Component[] getComponents() {
        return components;
    }

    public void setComponents(List<Component> components) {
        this.components = components.toArray(new Component[0]);
    }

    public List<TimeFrame> getTime_frame() {
        return time_frame;
    }

    public void setTime_frame(List<TimeFrame> time_frame) {
        this.time_frame = time_frame;
    }

    public List<Stage> getStages() {
        return stages;
    }

    public void setStages(List<Stage> stages) {
        this.stages = stages;
    }

    public List<Mesocycle> getMesocycles() {
        return mesocycles;
    }

    public void setMesocycles(List<Mesocycle> mesocycles) {
        this.mesocycles = mesocycles;
    }
}
