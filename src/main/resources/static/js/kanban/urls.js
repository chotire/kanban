var urls = {
  kanbans: "/api/kanbans",
  init: function() {
    this.kanban = this.kanbans + "/" + kanbanId;
    this.panels = this.kanbans + "/" + kanbanId + "/panels";
    this.members = this.kanban + "/members";
    this.panelDnd = this.kanban + "/panel/dnd";
    this.cardDnd = this.kanban + "/card/dnd"
    return this;
  }
}.init();