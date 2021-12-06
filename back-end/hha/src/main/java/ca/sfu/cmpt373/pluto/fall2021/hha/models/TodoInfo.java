package ca.sfu.cmpt373.pluto.fall2021.hha.models;

public class TodoInfo {

    private boolean shouldBeSeen;
    private Long daysDelayedCaseStudy;
    private Long daysDelayedForm;

    public TodoInfo() {
    }

    public TodoInfo(boolean shouldBeSeen, Long daysDelayedCaseStudy, Long daysDelayedForm) {
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

    public Long getDaysDelayedCaseStudy() {
        return daysDelayedCaseStudy;
    }

    public void setDaysDelayedCaseStudy(Long daysDelayedCaseStudy) {
        this.daysDelayedCaseStudy = daysDelayedCaseStudy;
    }

    public Long getDaysDelayedForm() {
        return daysDelayedForm;
    }

    public void setDaysDelayedForm(Long daysDelayedForm) {
        this.daysDelayedForm = daysDelayedForm;
    }
}
