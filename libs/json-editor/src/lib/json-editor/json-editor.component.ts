import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import JE from '@json-editor/json-editor';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-json-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './json-editor.component.html',
  styleUrl: './json-editor.component.css',
})
export class JsonEditorComponent implements OnInit {
  formControl = input<FormControl | null>(null);

  ngOnInit(): void {
    console.log(JE);
  }
}
