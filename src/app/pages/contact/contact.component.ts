import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  statusSendMessage = false;
  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(18),
        Validators.minLength(2),
        Validators.pattern(/^[A-z]/),
      ],
    ],
    message: [
      '',
      [Validators.required, Validators.max(300), Validators.minLength(5)],
    ],
  });

  constructor(private fb: NonNullableFormBuilder) {}

  get controls() {
    return this.contactForm.controls;
  }

  sendMessageSuccesse() {
    this.statusSendMessage = true;
    console.log(this.statusSendMessage);
  }

  updatestatusSendMessage() {
    this.statusSendMessage = false;
    this.contactForm.reset();
  }
}
