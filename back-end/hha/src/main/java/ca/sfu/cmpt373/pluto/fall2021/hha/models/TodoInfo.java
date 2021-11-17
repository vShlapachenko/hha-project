package ca.sfu.cmpt373.pluto.fall2021.hha.models;

public class TodoInfo {

    private boolean shouldBeSeen;
//    private boolean isAnythingDelayed;
    private Integer daysDelayedCaseStudy;
    private Integer daysDelayedForm;

    public TodoInfo() {
    }

    public TodoInfo(boolean shouldBeSeen, Integer daysDelayedCaseStudy, Integer daysDelayedForm) {
        this.shouldBeSeen = shouldBeSeen;
        this.daysDelayedCaseStudy = daysDelayedCaseStudy;
        this.daysDelayedForm = daysDelayedForm;
    }

    public boolean isShouldBeSeen() {
        return shouldBeSeen;
    }

    public void setShouldBeSeen(boolean shouldBeSeen) {
        this.shouldBeSeen = shouldBeSeen;
    }

    public Integer getDaysDelayedCaseStudy() {
        return daysDelayedCaseStudy;
    }

    public void setDaysDelayedCaseStudy(Integer daysDelayedCaseStudy) {
        this.daysDelayedCaseStudy = daysDelayedCaseStudy;
    }

    public Integer getDaysDelayedForm() {
        return daysDelayedForm;
    }

    public void setDaysDelayedForm(Integer daysDelayedForm) {
        this.daysDelayedForm = daysDelayedForm;
    }
}
