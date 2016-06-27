var MemberAddButton = React.createClass({
  handleClick: function() {
    $("#memberModal").modal({backdrop: "static"})
  },
  render: function() {
    return (
      <Button color="success" text="Add Members&hellip;" icon="plus" onClick={this.handleClick} />
    );
  }
});
window.MemberAddButton = MemberAddButton;

var MemeberForm = React.createClass({
  componentDidMount: function() {
    var validator = $("#memberModal form").validate({
      submitHandler: function(form) {
        this.props.onMemberAdd(form);
      }.bind(this)
    });

    $("#memberModal").on("hidden.bs.modal", function() {
      $("form", this)[0].reset();
      validator.resetForm();
    });
  },
  render: function() {
    var members = this.props.members.map(function(member) {
      return (
        <li className="list-group-item member-item clearfix" key={member.id}>
          {member.name}
          <button dtype="button" className="close" onClick={this.props.onMemberDelete.bind(this, member.id)}>×</button>
          <Picture file={member.picture} title={member.name} />
        </li>
      );
    }.bind(this));

    return (
      <Modal id="memberModal" size="modal-sm" title="Member">
        <Input name="name" label="Name" required="true" />
        <Input type="file" name="pictureFile" label="Photo" />
        <p className="help-block">
          <span className="glyphicon glyphicon-user"></span> 사진을 첨부하세요!!
        </p>
        <ModalTail>
          <ul className="list-group member-list">
            {members}
          </ul>
        </ModalTail>
      </Modal>
    );
  }
});
window.MemeberForm = MemeberForm;