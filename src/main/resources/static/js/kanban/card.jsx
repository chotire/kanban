var defaultCardState = {
  id: "",
  panelId: "",
  name: "",
  dueDate: "",
  color: "#d8d7d7",
  note: "",
  sortOrder: "",
  members: []
};

var CardForm = React.createClass({
  handleChange: function(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  },
  handleRemovePicture: function(id) {
    var removalIndex = 0;
    this.state.members.forEach(function(member, index) {
      if (member.id === id) {
        removalIndex = index;
        return false;
      }
    });

    this.setState({
      members: React.addons.update(this.state.members, {
        $splice: [[removalIndex, 1]]
      })
    });
  },
  getInitialState: function() {
    return defaultCardState;
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState(nextProps.card);
  },
  componentDidMount: function() {
    $("#memberSearch").autocomplete({
      source: function(request, response) {
        $.getJSON(urls.members, {name: request.term}, function(membsers) {
          response (
            membsers.map(function(member) {
              return {
                label: member.name,
                member: member
              };
            })
          );
        });
      },
      focus: function() {
        return false;
      },
      select: function(e, ui) {
        this.setState({
          members: React.addons.update(this.state.members, {
            $push: [ui.item.member]
          })
        });
        e.target.value = "";
        return false;
      }.bind(this)
    });

    var validator = $("#cardModal form").validate({
      submitHandler: function(form) {
        this.props.onSubmitCard(this.state);
      }.bind(this)
    });

    $("#cardModal").on("hidden.bs.modal", function() {
      validator.resetForm();
      this.setState(defaultCardState);
    }.bind(this));
  },
  render: function() {
    var pictures = this.state.members.map(function(member) {
      return (
        <div className="thumbnail-remove" key={member.id}>
          <Picture file={member.picture} title={member.name} key={member.id} />
          <span className="glyphicon glyphicon-remove-circle" onClick={this.handleRemovePicture.bind(this, member.id)} />
        </div>
      );
    }.bind(this));

    return (
      <Modal id="cardModal" size="modal-md" title="Card">
        <Input name="name" label="Name" required="true" value={this.state.name} onChange={this.handleChange} />
        <DatePicker name="dueDate" label="Due Date" value={this.state.dueDate} onChangeDate={this.handleChange} />
        <ColorPicker preview={this.state.color} value={this.state.color} onChangeColor={this.handleChange} />
        <TextArea name="note" label="Note" value={this.state.note} onChange={this.handleChange} />
        <Input name="memberSearch" label="Search members" />
        <div className="clearfix">
          {pictures}
        </div>
      </Modal>
    );
  }
});
window.CardForm = CardForm;

var Card = React.createClass({
  handleTitleClick: function(panelId, cardId) {
    this.props.onClickCard(panelId, cardId);
  },
  handleDeleteClick: function(panelId, cardId) {
    this.props.onDeleteCard(panelId, cardId);
  },
  render: function() {
    var card = this.props.card, note, dueDate;
    if (card.note) {
      note = (
        <small>
          <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
        </small>
      );
    }
    if (card.dueDate) {
      dueDate = (
        <small>
          <span className="glyphicon glyphicon-time" aria-hidden="true"></span>
          {card.dueDate}
        </small>
      );
    }

    var pictures = card.members.map(function(member) {
      return (
        <Picture file={member.picture} title={member.name} key={member.id} />
      );
    });

    return (
      <li id={card.id} className="list-group-item">
        <div className="clearfix list-group-item-toolbox">
          <div className="list-group-item-priority" style={{backgroundColor: card.color}}></div>
          <div className="list-group-item-toolbar">
            <span onClick={this.handleDeleteClick.bind(this, card.panelId, card.id)} className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </div>
        </div>
        <div className="list-group-item-content">
          <span onClick={this.handleTitleClick.bind(this, card.panelId, card.id)}>{card.name}</span>
          <div>
            {note}
            {dueDate}
          </div>
        </div>
        <div className="text-right">
          {pictures}
        </div>
      </li>
    );
  }
});
window.Card = Card;