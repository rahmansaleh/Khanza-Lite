$(document).ready(function(){
    $("#user-checkbox").DataTable({
        responsive: { details: { type: "column", target: "tr" } },
        columnDefs: [
            { orderable: !1, className: "select-checkbox", targets: 0 },
            { width: "40px", targets: 1 },
            { responsivePriority: 1, targets: 2 },
            { targets: 7, className: "control" },
            { width: "100px", targets: 8, orderable: !1 },
        ],
        select: { style: "multi", selector: "td:first-child" },
        order: [1, "asc"],
        bFilter: !0,
        bLengthChange: !0,
        pagingType: "simple",
        paging: !0,
        searching: !0,
        language: {
            info: " _START_ - _END_ of _TOTAL_ ",
            sLengthMenu: "<span class='custom-select-title'>Rows per page:</span> <span class='pmd-custom-select'> _MENU_ </span>",
            sSearch: "",
            sSearchPlaceholder: "Search",
            paginate: { sNext: " ", sPrevious: " " },
        },
        dom:
            "<'card-header d-md-flex flex-row'<'data-table-title mb-3'><'pmd-textfield datatable-search ml-sm-auto'f>><'custom-select-info align-items-center'<'custom-select-item'><'custom-select-action'>><'row'<'col-sm-12'tr>><'card-footer' <'pmd-datatable-pagination' l i p>>",
    }),
    $("#user-checkbox_wrapper .custom-select-info").hide();
    $("#user-checkbox tbody").on("click", "tr", function () {
        if ($(this).hasClass("selected")) {
            var t = $(this).closest(".dataTables_wrapper").find(".select-info").text();
            $(this).closest(".dataTables_wrapper").find(".custom-select-info .custom-select-item").text(t),
                null != $(this).closest(".dataTables_wrapper").find(".custom-select-info .custom-select-item").text()
                    ? $(this).closest(".dataTables_wrapper").find(".custom-select-info").show()
                    : $(this).closest(".dataTables_wrapper").find(".custom-select-info").hide();
        } else {
            t = $(this).closest(".dataTables_wrapper").find(".select-info").text();
            $(this).closest(".dataTables_wrapper").find(".custom-select-info .custom-select-item").text(t);
        }
        0 == $("#user-checkbox").find(".selected").length && $(this).closest(".dataTables_wrapper").find(".custom-select-info").hide();
    });
    var t = $("#user-checkbox").DataTable().rows().count();
    $("#user-checkbox_wrapper .data-table-title").html('<h2 class="card-title">Total : ' + t + "</h2>");
    $("#user-checkbox_wrapper .custom-select-action").html(
        '<button class="btn btn-sm pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-dark" type="button" data-target="#delete_user_modal" data-toggle="modal" title="Delete"><i class="material-icons pmd-sm">delete_outline</i></button>'
    );
});

$('select').each(function () {
    var options = {
        useDimmer: true,
        useSearch: true,
        labels: {
            search: '...'
        }
    };
    $.each($(this).data(), function (key, value) {
        options[key] = value;
    });
    $(this).selectator(options);
});

$(function () {
  if($('#notify').length)
    {
    $('#notify').slideDown(500);
    setTimeout(function() {
      $('#notify').slideUp(500);
    }, 5000);
  }
});
