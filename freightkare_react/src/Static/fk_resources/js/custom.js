$(document).ready(function () {
  $(".mob-menu-icon").on("click", function () {
    if (!$(this).hasClass("open")) {
      $(this).addClass("open");
      $("body").css("overflow", "hidden");
      $(".mob-menu-wrapper").show();
    } else {
      $(this).removeClass("open");
      $("body").css("overflow", "unset");
      $(".mob-menu-wrapper").hide();
    }
  });

  if (!!$(".datepicker").length) {
    $(".datepicker").datepicker();

    $(".material-textfield-calender img").on("click", function () {
      $(this).closest(".material-textfield-calender").find("input").focus();
    });
  }

  // Clone Handler start
  const cloneHandler = (e) => {
    let container = $(e.target)
      .closest(".fk-detail-wrap")
      .find(".fk-detail-container")[0];
    let clone_length = $(container).find(".fk-clone").length;
    let clone = $($(container).find(".fk-clone")[0]).clone();

    let input_field = [...$(clone).find("input")];
    let select_field = [...$(clone).find("select")];

    input_field.forEach((item, i) => {
      $(item).val("");
      $(item).prop("checked", false);
      if (
        $(item).attr("type") === "radio" ||
        $(item).attr("type") === "checkbox"
      ) {
        if ($(item).attr("name")) {
          let name_attr = $(item).attr("name");
          let split_name = name_attr.split("_");
          let split_nameLastVal = split_name.pop();
          let update_nameVal = (split_nameLastVal = clone_length);
          split_name.push(update_nameVal);
          split_name = split_name.join("_");

          $(item).attr("name", split_name);
        }

        let id_attr = $(item).attr("id");
        let split_id = id_attr.split("_");
        let split_idLastVal = split_id.pop();
        let update_idVal = (split_idLastVal = clone_length);
        split_id.push(update_idVal);
        split_id = split_id.join("_");

        $(item).attr("id", split_id);

        $(item).closest(".form-check").find("label").attr("for", split_id);
      }
    });

    select_field.forEach((item, i) => {
      $(item).val("");
    });

    $(container).append(clone);

    $(container).find(".delete-clone").show();
  };

  $(document).on("click", ".btn-clone", cloneHandler.bind(this));

  // Clone Handler end

  // Delete clone
  const deleteHandler = (e) => {
    let container = $(e.target)
      .closest(".fk-detail-wrap")
      .find(".fk-detail-container")[0];
    let clone_length = $(container).find(" > .fk-clone").length;

    if (clone_length > 1) {
      $(e.target).closest(".fk-clone").remove();
    }
    if (clone_length === 2) {
      $(e.target).closest(".fk-clone").remove();
      $(container).find(".delete-clone").hide();
    }
  };

  $(document).on("click", ".delete-clone", deleteHandler.bind(this));

  // Delete clone end

  $(document).on("click", ".dang_cargo", function () {
    if ($(this).is(":checked")) {
      $(this).closest(".fk-commodity").find(".imo-class").fadeIn();
      $(this).closest(".fk-commodity").find(".imo-class-btn").fadeIn();
    } else {
      $(this).closest(".fk-commodity").find(".imo-class").fadeOut();
      $(this).closest(".fk-commodity").find(".imo-class-btn").fadeOut();
    }
  });

  // inputRangeHandler

  $(document).on("click", ".quantity-field .add", (event) =>
    inputRangeHandler(event, "add")
  );
  $(document).on("click", ".quantity-field .sub", (event) =>
    inputRangeHandler(event, "sub")
  );
  $(document).on("keyup", ".quantity-field input", function (event) {
    if (parseInt(event.target.value) < 0) {
      $(this).val(0);
    }
  });

  function inputRangeHandler(event, identifier) {
    let inputField = $(event.target).closest(".quantity-field").find("input");
    let input_val =
      $(inputField).val() !== "" ? parseInt($(inputField).val()) : 0;

    if (input_val <= 0 && identifier === "sub") return;

    if (identifier === "add") {
      inputField.val(input_val + 1);
    }

    if (identifier === "sub") {
      inputField.val(input_val - 1);
    }
  }

  // inputRangeHandler end

  $(".dang_cargo_wrap .form-check").on("click", function () {
    if ($(this).find(".dang_cargo").is(":checked")) {
      $(this).closest(".fk-cargo").find(".cargo-doc").fadeIn();
    } else {
      $(this).closest(".fk-cargo").find(".cargo-doc").fadeOut();
    }
  });
  $(".transport").on("click", function () {
    if ($(this).find("input").is(":checked")) {
      $(this)
        .closest(".fk-booking-detail")
        .find(".fk-booking-field .address")
        .fadeIn();
    } else {
      $(this)
        .closest(".fk-booking-detail")
        .find(".fk-booking-field .address")
        .fadeOut();
    }
  });
  $(".dimension_wrap .dimension-check").on("click", function () {
    if ($(this).find("input").is(":checked")) {
      let dimension = $(this).find("input").val();
      let dimension_fields = [
        ...$(this)
          .closest(".fk-containerType")
          .find(".fk-product-detail .fk-clone .fk-product-scale"),
      ];
      dimension_fields.forEach((item, i) => {
        $(item).find("h3 span").text(`(${dimension})`);
      });
    }
  });
});
