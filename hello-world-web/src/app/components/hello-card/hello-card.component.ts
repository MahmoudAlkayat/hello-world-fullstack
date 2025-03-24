import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorldEntity } from '../../services/hello-world.service';

@Component({
  selector: 'app-hello-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hello-card.component.html',
  styleUrls: ['./hello-card.component.scss']
})
export class HelloCardComponent {
  @Input() entity!: HelloWorldEntity;
  @Output() edit = new EventEmitter<HelloWorldEntity>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.entity);
  }

  onDelete() {
    if (this.entity.id) {
      this.delete.emit(this.entity.id);
    }
  }
}
