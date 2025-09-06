/**
 * package    Know Reservations
 * subpackage Admin Js
 * copyright  2020 Highland Vision. All rights reserved.
 * license    See the file "LICENSE.txt" for the full license governing this code.
 * author     Hazel Wilson <hazel@highlandvision.com>
 */
"use strict";

document.addEventListener('DOMContentLoaded', function () {
	let previewNode = document.querySelector('#template');
	previewNode.id = '';
	let previewTemplate = previewNode.parentNode.innerHTML;
	previewNode.parentNode.removeChild(previewNode);
	// noinspection TypeScriptUMDGlobal
	Dropzone.autoDiscover = true;

	const formdata = document.getElementById('dropzonedata');
	// noinspection TypeScriptUMDGlobal
	let myDropzone = new Dropzone(document.body, {
		url:                   formdata.dataset.url,
		uploadMultiple:        true,
		previewTemplate:       previewTemplate,
		createImageThumbnails: true,
		thumbnailWidth:        90,
		thumbnailHeight:       60,
		thumbnailMethod:       'crop',
		autoQueue:             false,
		autoProcessQueue:      false,
		previewsContainer:     '#previews',
		clickable:             '.fileinput-button',
		parallelUploads:       100,
		maxFiles:              100,
		error: function(file, response) {
			alert(response.message);
		}
	})
	myDropzone.on('addedfile', function (file) {
		file.previewElement.querySelector('.start').onclick = function () {
			myDropzone.enqueueFile(file)
		}
	})
	myDropzone.on('sending', function (file, xhr, formData) {
		formData.append('property_id', formdata.dataset.property_id);
		formData.append(formdata.dataset.token, '1');
		document.querySelector('#total-progress').style.opacity = '1'
		file.previewElement.querySelector('.start').setAttribute('disabled', 'disabled')
	})
	myDropzone.on('totaluploadprogress', function (progress) {
		// Update the total progress bar
		document.querySelector('#total-progress .progress-bar').style.width = progress + '%'
	})
	myDropzone.on('queuecomplete', function () {
		if (myDropzone.getUploadingFiles().length === 0 && myDropzone.getQueuedFiles().length === 0) {
			document.querySelector('#total-progress').style.opacity = '0'
			window.location.reload();
		}
	})


	// Set up the buttons for all transfers
	// The "add files" button doesn't need to be setup because the config
	// `clickable` has already been specified.
	document.querySelector('#actions .start').onclick = function () {
		// noinspection TypeScriptUMDGlobal
		myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
		myDropzone.processQueue();
	}
	// Cancel upload
	document.querySelector('#actions .cancel').onclick = function () {
		myDropzone.removeAllFiles(true)
	}
}, false);