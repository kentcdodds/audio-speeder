/* @jsx jsx */
import {jsx, css, Global} from '@emotion/core'

import React, {useRef, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

function App() {
  const audioRef = useRef()
  const [audioSrc, setAudioSrc] = useState()
  const [playbackRate, setPlaybackRate] = useState(1)
  useEffect(
    () => {
      if (!audioRef.current) {
        return
      }
      audioRef.current.playbackRate = playbackRate
    },
    [playbackRate],
  )

  function setAudioSrcFromLocalFile(event) {
    const reader = new FileReader()
    reader.onload = e => setAudioSrc(e.target.result)
    reader.readAsDataURL(event.target.files[0])
  }

  return (
    <div>
      <Global
        styles={css`
          body {
            font-family: 'Squada One', cursive;
          }
        `}
      />
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContents: 'center',
          maxWidth: 500,
          margin: 'auto',
        }}
      >
        <h1 css={{textAlign: 'center', fontSize: '3rem'}}>
          Audio Speeder{' '}
          <span
            role="img"
            aria-label="race car with a puff of smoke behind it"
            css={{display: 'inline-block', transform: 'scaleX(-1)'}}
          >
            🏎💨
          </span>
        </h1>

        <div css={{fontSize: '1.5em', marginBottom: 20}}>Choose One:</div>

        <label>Local File</label>
        <input
          css={{marginBottom: 20}}
          type="file"
          onChange={setAudioSrcFromLocalFile}
        />

        <label htmlFor="fileUrl">File URL</label>
        <input
          type="text"
          id="fileUrl"
          onChange={e => setAudioSrc(e.target.value)}
          css={{
            lineHeight: 2,
            fontSize: '1.2rem',
            padding: '6px 14px',
            borderRadius: 4,
            border: '2px solid #1d1075',
            marginBottom: 20,
          }}
        />
        {audioSrc ? (
          <>
            <div
              css={{display: 'flex', alignItems: 'center', marginBottom: 20}}
            >
              <label css={{marginRight: 20, lineHeight: 1.5}}>
                Playback Rate
              </label>
              <input
                type="number"
                min={0}
                max={5}
                step="0.1"
                value={playbackRate}
                onChange={e => setPlaybackRate(e.target.value)}
                css={{
                  lineHeight: 1.5,
                  fontSize: '1.2rem',
                  padding: '6px 14px',
                  borderRadius: 4,
                  border: '2px solid #1d1075',
                  marginRight: 10,
                }}
              />
              <input
                type="range"
                min={0}
                max={5}
                step="0.1"
                value={playbackRate}
                onChange={e => setPlaybackRate(e.target.value)}
                css={{flex: '1'}}
              />
            </div>
            <audio
              controls={true}
              css={{width: '100%'}}
              ref={audioRef}
              src={audioSrc}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('🏎'))

/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/
