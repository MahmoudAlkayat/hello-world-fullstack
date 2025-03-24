import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HelloWorldService, HelloWorldEntity } from '../../services/hello-world.service';
import { HelloCardComponent } from '../hello-card/hello-card.component';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HelloCardComponent
  ],
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent implements OnInit {
  entities: HelloWorldEntity[] = [];
  newEntity: HelloWorldEntity = {
    mood: '',
    level: 0
  };
  editingEntity: HelloWorldEntity | null = null;
  updateId: number | null = null;
  searchId: number | null = null;
  searchMood: string = '';
  searchLevel: number = 0;
  searchType: 'and' | 'or' | null = null;
  deleteId: number | null = null;
  errorMessage: string | null = null;
  searchMessage: string | null = null;

  constructor(private helloWorldService: HelloWorldService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.searchMessage = null;
    this.helloWorldService.getAll().subscribe({
      next: (data) => {
        this.entities = data;
        if (data.length === 0) {
          this.searchMessage = 'No entities found';
        }
      },
      error: (error) => console.error('Error loading entities:', error)
    });
  }

  loadEntityForEdit() {
    if (this.updateId) {
      this.helloWorldService.getById(this.updateId).subscribe({
        next: (entity) => {
          this.editingEntity = entity;
          this.newEntity = {
            mood: entity.mood,
            level: entity.level
          };
          this.errorMessage = null;
        },
        error: (error) => {
          console.error('Error loading entity:', error);
          this.errorMessage = 'Failed to load entity';
          this.editingEntity = null;
          this.updateId = null;
          this.resetForm();
        }
      });
    }
  }

  onSubmit() {
    // Validate required fields
    if (!this.newEntity.mood || this.newEntity.level === null || this.newEntity.level === undefined) {
      this.errorMessage = 'Mood and Level are required';
      return;
    }

    if (this.editingEntity) {
      // Update existing entity
      this.helloWorldService.update(this.editingEntity.id!, {
        mood: this.newEntity.mood,
        level: this.newEntity.level
      }).subscribe({
        next: () => {
          // Update was successful, refresh the list
          this.loadAll();
          this.resetForm();
          this.errorMessage = null;
        },
        error: (error) => {
          console.error('Error updating entity:', error);
          if (error.error) {
            console.error('Error details:', error.error);
          }
          this.errorMessage = 'Failed to update entity';
        }
      });
    } else {
      // Create new entity
      this.helloWorldService.create(this.newEntity).subscribe({
        next: (created) => {
          this.entities.push(created);
          this.resetForm();
          this.errorMessage = null;
        },
        error: (error) => {
          console.error('Error creating entity:', error);
          this.errorMessage = 'Failed to create entity';
        }
      });
    }
  }

  resetForm() {
    this.newEntity = {
      mood: '',
      level: 0
    };
    this.editingEntity = null;
    this.updateId = null;
    this.errorMessage = null;
  }

  cancelEdit() {
    this.editingEntity = null;
    this.updateId = null;
    this.errorMessage = null;
    this.resetForm();
  }

  onEdit(entity: HelloWorldEntity) {
    this.editingEntity = entity;
    this.newEntity = { ...entity };
  }

  onDelete(id: number) {
    this.helloWorldService.delete(id).subscribe({
      next: () => {
        this.entities = this.entities.filter(e => e.id !== id);
        if (this.editingEntity?.id === id) {
          this.resetForm();
        }
      },
      error: (error) => console.error('Error deleting entity:', error)
    });
  }

  search() {
    this.searchMessage = null;
    if (this.searchId) {
      this.helloWorldService.getById(this.searchId).subscribe({
        next: (data) => {
          this.entities = [data];
          this.searchMessage = null;
        },
        error: (error) => {
          console.error('Error searching by ID:', error);
          this.entities = [];
          this.searchMessage = `No entity found with ID: ${this.searchId}`;
        }
      });
    } else if (this.searchType === 'and') {
      this.helloWorldService.getByMoodAndLevel(this.searchMood, this.searchLevel).subscribe({
        next: (data) => {
          this.entities = data;
          if (data.length === 0) {
            this.searchMessage = `No entities found with mood "${this.searchMood}" AND level ${this.searchLevel}`;
          }
        },
        error: (error) => {
          console.error('Error searching by mood and level:', error);
          this.entities = [];
          this.searchMessage = 'Error occurred while searching';
        }
      });
    } else if (this.searchType === 'or') {
      this.helloWorldService.getByMoodOrLevel(this.searchMood, this.searchLevel).subscribe({
        next: (data) => {
          this.entities = data;
          if (data.length === 0) {
            this.searchMessage = `No entities found with mood "${this.searchMood}" OR level ${this.searchLevel}`;
          }
        },
        error: (error) => {
          console.error('Error searching by mood or level:', error);
          this.entities = [];
          this.searchMessage = 'Error occurred while searching';
        }
      });
    } else if (this.searchMood) {
      this.helloWorldService.getByMood(this.searchMood).subscribe({
        next: (data) => {
          this.entities = data;
          if (data.length === 0) {
            this.searchMessage = `No entities found with mood "${this.searchMood}"`;
          }
        },
        error: (error) => {
          console.error('Error searching by mood:', error);
          this.entities = [];
          this.searchMessage = 'Error occurred while searching';
        }
      });
    } else if (this.searchLevel) {
      this.helloWorldService.getByLevel(this.searchLevel).subscribe({
        next: (data) => {
          this.entities = data;
          if (data.length === 0) {
            this.searchMessage = `No entities found with level ${this.searchLevel}`;
          }
        },
        error: (error) => {
          console.error('Error searching by level:', error);
          this.entities = [];
          this.searchMessage = 'Error occurred while searching';
        }
      });
    }
  }

  trackById(index: number, entity: HelloWorldEntity): number {
    return entity.id!;
  }
}
