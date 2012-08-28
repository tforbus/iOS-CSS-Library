$(document).ready(function() {
	
	// Hide views that shouldn't be seen ---------------------------------------
	
	$('#Chat').hide();
	$('.PopupContainer').hide();
		$('#DeleteConfirm').hide();
		$('#EmailPopup').hide();
		$('#DescriptionDetailsPopup').hide();
	
	
	// Request Information View ------------------------------------------------
	
		// TextInformation Controls - - - - - - - - - - - - - - - - - - - - - - 
		$('#tiDescVal').parent().find('.Expandable').click(function() {
			/*if($(this).html() == "( + )") {
				$(this).html("( - )");
				$(this).parent().find('#tiDescVal').removeClass('ShrinkyText');
			}
		
			else {
				$(this).html("( + )");
				$(this).parent().find('#tiDescVal').addClass('ShrinkyText');
			}*/
			
			$('#DescriptionDetailsPopup').find('p').html($('#tiDescVal').html());
			$('.PopupContainer').show();
			$('#DescriptionDetailsPopup').siblings().hide();
			$('#DescriptionDetailsPopup').show();
		});
	
		$('#tiEmail').parent().find('.Expandable').click(function() {
			var isLoggedIn = false;//@AppContext.LoggedIn.ToString(CultureInfo.InvariantCulture).ToLower();
			$('.PopupContainer').show();
			
			if(!isLoggedIn) {
				$('#NoPermissionPopup').siblings().hide();
				$('#NoPermissionPopup').show();
			}
			
			else {
				$('#EmailPopup').siblings().hide();
				$('#EmailPopup').show();		
				$('#EmailPopupEmailValue').html($('#tiEmailVal').html());
			}
		});
	
	
		// Priority Control - - - - - - - - - - - - - - - - - - - - - - - - - - 
		$('.Options li').click(function() {
			if($(this).hasClass('Active')) {
				return;
			}
			$(this).addClass('Active');
			$(this).siblings().removeClass('Active');
			
			/*$.ajax({
				type: 'POST',
				url: "@Url.Action("Priority")" + ﻿"?requestId="+"@Model.RequestId"+"&priority="+priority,
				success: function(data) {
					//$(".container").html(data);
				}
			});*/
		});
		
		
		// Status Control - - - - - - - - - - - - - - - - - - - - - - - - - - - 
		$('.ControlButtons li').click(function() {
			$(this).addClass('Active');
			$(this).find('div').addClass('Active');	
			$(this).siblings().removeClass('Active');
			$(this).siblings().find('div').removeClass('Active');
		
			if($(this).attr('id') == "ButtonEject") {
				$('.PopupContainer').show();
				$('#DeleteConfirm').siblings().hide();
				$('#DeleteConfirm').show();
			}
		});
	
	
		// TabBar Control - - - - - - - - - - - - - - - - - - - - - - - - - - - 
		$('.TabBarContainer li').click(function() {
			var elemId = $(this).attr('id');

			// Request information		
			if(elemId == 'tbRinfo' && !$(this).hasClass('Active')) {
				$('#Chat').hide();
				$('#Information').show();
				$(this).addClass('Active');
				$(this).siblings().removeClass('Active');
			}
		
			// Request comments
			if(elemId == 'tbRcomments' && !$(this).hasClass('Active')) {
				$('#Information').hide();
				$('#Chat').show();
				$(this).addClass('Active');
				$(this).siblings().removeClass('Active');
				
				scrollComments();
			}
		});
		
		
	// Assign Users Control ----------------------------------------------------
	
		// Animate Assigned/Unassigned
			$('#UserList li').click(function() {
				var notAssigned = '<div class=\"Slider\"></div>Not Assigned';
				var assigned = '<div class=\"Slider\"></div>Assigned';
				
				if($(this).find('.Yes').html() != null) {
					$(this).find('.Yes').removeClass('Yes').addClass('No');
					$(this).find('.No').html(notAssigned);
				}
				else {
					$(this).find('.No').removeClass('No').addClass('Yes');
					$(this).find('.Yes').html(assigned);
				}
			});


	// Popup Controls ----------------------------------------------------------
	
		// Email Popup - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
		$('#EmailPopup').find('.Button').click(function() {
			if($(this).hasClass('Submit')) {
				alert('send an email');
			}
			else {
				alert('cancel');
			}
			
			$('.PopupContainer').hide();
		});
	

		// Delete Request Popup - - - - - - - - - - - - - - - - - - - - - - - - 
		$('#DeleteConfirm').find('.Button').click(function() {
			if($(this).hasClass('Yes')) {
				alert('delete this request');
			}
			else {
				alert('clicked no');
			}
			
			$('.PopupContainer').hide();
		});
			
		// No Email Permission Popup - - - - - - - - - - - - - - - - - - - - - -
		$('#NoPermissionPopup').find('.Button').click(function() {
			$('.PopupContainer').hide();
		});
		
		// Description Details Popup - - - - - - - - - - - - - - - - - - - - - - 
		$('#DescriptionDetailsPopup').find('.Button').click(function() {
			$('.PopupContainer').hide();
		});
		
	
	// Comment Controls --------------------------------------------------------
		var $container = $('#ChatWindowContainer');
		var $holder = $('#ChatWindowContainerPositionHidden');
		
		// Scroll to bottom
		function scrollComments() {
			$container.animate({scrollTop:$container.height()}, 1000, function(){});
		}
		
		// Saves the position of the chat/comment window
		// $holder is a hidden field that stores the position of the scrollbar.
		function savePosition() {
			$holder.val($container.scrollTop());			
		}

		// Save the position of the chat window
		$container.scroll(function() {
			savePosition();
		});

		// Refresh the chat window every so often
		setInterval(function() {
			if($holder.val() >= 0 && $holder.val() != "") {
				$container.scrollTop($holder.val());
			}

			else {
				$container.scrollTop($container.height());
			}
		}, 9001);

		$.ajaxSetup({cache: false});
		
		// Add Comment - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
		$('#AddCommentButton').click(function() {
			var newComment = $("#CommentEntryInput").val();
			alert('posting comment ' + newComment);
			/*$.ajax({
            	type: 'POST',
				url: "@Url.Action("Comments")" +"?requestId=" + "@Model.RequestId" +"&comment=" + newComment,
				success: function(data) {
					$(".container").html(data);
                }
            });*/
		});
				
});