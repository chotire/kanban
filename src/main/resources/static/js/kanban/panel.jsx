var PanelAddButton = React.createClass({
  handleClick: function() {
    $("#panelModal").modal({backdrop: "static"});
  },
  render: function() {
    return (
      <Button color="info" text="Add Panels&hellip;" icon="plus" onClick={this.handleClick} />
    );
  }
});
window.PanelAddButton = PanelAddButton;

var defaultPanelState = {
  id: "",
  name: "",
  color: "#777777",
  sortOrder: ""
};
var PanelForm = React.createClass({
  handleChange: function(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  },
  getInitialState: function() {
    return defaultPanelState;
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState(nextProps.panel);
  },
  componentDidMount: function() {
    var validator = $("#panelModal form").validate({
      submitHandler: function(form) {
        this.props.onSubmitPanel({
          id: this.state.id,
          name: this.state.name,
          color: this.state.color,
          sortOrder: this.state.sortOrder
        });
      }.bind(this)
    });

    $("#panelModal").on("hidden.bs.modal", function() {
      validator.resetForm();
      this.setState(defaultPanelState);
    }.bind(this));
  },
  render: function() {
    return (
      <Modal id="panelModal" size="modal-sm" title="Panel">
        <input type="hidden" name="sortOrder" value={this.state.sortOrder} />
        <Input name="name" label="Name" required="true" value={this.state.name} onChange={this.handleChange} />
        <ColorPicker simple="true" preview={this.state.color} value={this.state.color} onChangeColor={this.handleChange} />
      </Modal>
    );
  }
});
window.PanelForm = PanelForm;

var colorSelectors = {
  "#777777": "default",
  "#337ab7": "primary",
  "#5cb85c": "success",
  "#5bc0de": "info",
  "#f0ad4e": "warning",
  "#d9534f": "danger"
};
var Panel = React.createClass({
  handleAddCardClick: function(id) {
    this.props.onClickAddCard(id);
  },
  handleTitleClick: function(id) {
    this.props.onClickPanel(id);
  },
  handleDeleteClick: function(id) {
    this.props.onDeletePanel(id);
  },
  getInitialState: function() {
    return {name: "", color: "default"};
  },
  componentDidMount: function() {
    var updates = [];

    $(".list-group").sortable({
      connectWith: ".list-group",
      placeholder: "list-group-item",
      forcePlaceholderSize: true,
      cursor: "move",
      opacity: 0.7,
      update: function(event, ui) {
        updates.push(event.target.id);
      },
      stop: function(event, ui) {
        if (updates.length == 0) {
          return;
        }

        var params = {
          panelIds: updates.join(),
          cardId: ui.item[0].id,
          sortOrder: ui.item.parent("ul").find("li").index(ui.item) + 1
        };

        $.put(urls.cardDnd, params, function() {
          $(event.target).sortable("cancel");
          this.props.onDragAndDropCard();
          updates = [];
        }.bind(this));
      }.bind(this)
    }).disableSelection();
  },
  render: function() {
    var cards = this.props.panel.cards.map(function(card) {
      return (
        <Card 
          card={card}
          onClickCard={this.props.onClickCard}
          onDeleteCard={this.props.onDeleteCard}
          key={card.id} />
      );
    }.bind(this));

    if (!cards.length) {
      cards = <li className="list-group-item" style={{panding: "1px", border: "0px"}} />;
    }

    return (
      <li id={this.props.panel.id}>
        <div className={"panel panel-" + colorSelectors[this.props.panel.color]}>
          <div className="panel-heading">
            <span onClick={this.handleTitleClick.bind(this, this.props.panel.id)}>{this.props.panel.name}</span>
            <span onClick={this.handleDeleteClick.bind(this, this.props.panel.id)} className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </div>
          <div className="panel-body">
            <ul id={this.props.panel.id} className="list-group">
              {cards}
            </ul>
            <div className="panel-footer">
              <span onClick={this.handleAddCardClick.bind(this, this.props.panel.id)}>Add a card&hellip;</span>
            </div>
          </div>
        </div>
      </li>
    );
  }
});

var PanelContainer = React.createClass({
  componentDidMount: function() {
    var updates = "";

    $("#panels").sortable({
      connectWith: ".panels",
      placeholder: "panel",
      forcePlaceholderSize: true,
      cursor: "move",
      handle: ".panel-heading",
      opacity: 0.7,
      update: function(event, ui) {
        updates = event.target.id;
      },
      stop: function(event, ui) {
        if (updates == "") {
          return;
        }

        var params = {
          panelId: ui.item[0].id,
          sortOrder: ui.item.parent("ul").find(">li").index(ui.item) + 1
        };

        $.put(urls.panelDnd, params, function(panels) {
          $(event.target).sortable("cancel");
          this.props.onDragAndDropPanel(panels);
          updates = "";
        }.bind(this));
      }.bind(this)
    }).disableSelection();
  },
  render: function() {
    var panels = this.props.panels.map(function(panel) {
      return (
        <Panel 
          panel={panel}
          key={panel.id}
          onClickPanel={this.props.onClickPanel}
          onDeletePanel={this.props.onDeletePanel}
          onClickCard={this.props.onClickCard}
          onDeleteCard={this.props.onDeleteCard}
          onClickAddCard={this.props.onClickAddCard}
          onDragAndDropCard={this.props.onDragAndDropCard}
        />
      );
    }.bind(this));
    return (
      <div>
        <ul id="panels" className="list-inline">
          {panels}
        </ul>
      </div>
    );
  }
});
window.PanelContainer = PanelContainer;