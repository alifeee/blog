# Images

To convert the videos I used ffmpeg. Specifically the command

```bash
ffmpeg -i video_both_jumpy-theramin.mp4 videoff_both_jumpy-theramin.mp4 && ffmpeg -i video_both_pong.mp4 -an videoff_both_pong.mp4 && ffmpeg -i video_neonode_proto.mp4 -an videoff_neonode_proto.mp4 && ffmpeg -i video_neonode_theramin.mp4 videoff_neonode_theramin.mp4 && ffmpeg -i video_sign_display-test.mp4 -an videoff_sign_display-test.mp4 && ffmpeg -i video_sign_garbage.mp4 -an videoff_sign_garbage.mp4 && ffmpeg -i video_sign_scrolling-text.mp4 -an videoff_sign_scrolling-text.mp4 && ffmpeg -i video_sign_scrolling-text_fast.mp4 -an videoff_sign_scrolling-text_fast.mp4
```

Which is these commands joined together:

- `ffmpeg -i video_both_jumpy-theramin.mp4 videoff_both_jumpy-theramin.mp4`
- `ffmpeg -i video_both_pong.mp4 -an videoff_both_pong.mp4`
- `ffmpeg -i video_neonode_proto.mp4 -an videoff_neonode_proto.mp4`
- `ffmpeg -i video_neonode_theramin.mp4 videoff_neonode_theramin.mp4`
- `ffmpeg -i video_sign_display-test.mp4 -an videoff_sign_display-test.mp4`
- `ffmpeg -i video_sign_garbage.mp4 -an videoff_sign_garbage.mp4`
- `ffmpeg -i video_sign_scrolling-text.mp4 -an videoff_sign_scrolling-text.mp4`
- `ffmpeg -i video_sign_scrolling-text_fast.mp4 -an videoff_sign_scrolling-text_fast.mp4`

Note that sound is removed from all videos apart from the theramin ones.