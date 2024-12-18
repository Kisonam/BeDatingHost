import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../_services/likes.service';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  private likeService = inject(LikesService);
  member = input.required<Member>();
  hasLiked = computed(() => this.likeService.likeIds().includes(this.member().id));


  toggleLike() {
    const member = this.member();
    if (!member || !member.id) {
      console.error('Invalid member or member ID:', member);
      return;
    }
    this.likeService.toggleLike(this.member().id).subscribe({
      next: () => {
        if (this.hasLiked()) {
          this.likeService.likeIds.update(ids => ids.filter(id => id !== this.member().id));
        }
        else {
          this.likeService.likeIds.update(ids => [...ids, this.member().id]);
        }
      }
    });
  }

  addLike(member: Member) {
    // this.likeService.addLike(member.id).subscribe({
    //   next: () => this.hasLiked.set(true)
    // });
  }
}
